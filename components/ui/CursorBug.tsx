'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorBugProps {
  isAttacked?: boolean;
  onAttackComplete?: () => void;
  shouldFollowCursor?: boolean;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

const CursorBug = ({ isAttacked = false, onAttackComplete, shouldFollowCursor = true, onPositionChange }: CursorBugProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bugPosition, setBugPosition] = useState({ x: 100, y: 100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isBeingAttacked, setIsBeingAttacked] = useState(false);

  useEffect(() => {
    // Show bug after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAttacked && !isBeingAttacked) {
      setIsBeingAttacked(true);
      
      // Attack animation - throw bug off screen
      setBugPosition({ x: -200, y: -200 });
      
      // Reset bug position after attack
      setTimeout(() => {
        setBugPosition({ x: 100, y: 100 });
        setIsBeingAttacked(false);
        onAttackComplete?.();
      }, 2000);
    }
  }, [isAttacked, isBeingAttacked, onAttackComplete]);

  useEffect(() => {
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps for mouse tracking
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate >= throttleDelay) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastUpdate = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isVisible || isBeingAttacked || !shouldFollowCursor) return;

    let animationFrameId: number;
    
    const followMouse = () => {
      setBugPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Allow bug to get very close to cursor (minimum distance of 5px)
        const minDistance = 5;
        // Maximum distance before bug starts moving
        const maxDistance = 300;
        
        let targetX = prev.x;
        let targetY = prev.y;
        
        if (distance > maxDistance) {
          // Move towards mouse but stop at minDistance
          const angle = Math.atan2(dy, dx);
          targetX = mousePosition.x - Math.cos(angle) * minDistance;
          targetY = mousePosition.y - Math.sin(angle) * minDistance;
        } else if (distance < minDistance) {
          // Move away from mouse slightly
          const angle = Math.atan2(dy, dx);
          targetX = mousePosition.x - Math.cos(angle) * minDistance;
          targetY = mousePosition.y - Math.sin(angle) * minDistance;
        } else {
          // Smoothly follow the mouse when within range
          targetX = mousePosition.x;
          targetY = mousePosition.y;
        }
        
        // Use requestAnimationFrame for smoother animation
        const lerpFactor = 0.12;
        const newPosition = {
          x: prev.x + (targetX - prev.x) * lerpFactor,
          y: prev.y + (targetY - prev.y) * lerpFactor,
        };
        
        // Notify parent of position change
        onPositionChange?.(newPosition);
        
        return newPosition;
      });
      
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition, isVisible, isBeingAttacked, shouldFollowCursor]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      style={{
        left: bugPosition.x - 12,
        top: bugPosition.y - 12,
        willChange: 'transform',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bug Body */}
      <motion.div
        className="relative"
        animate={{
          rotate: isBeingAttacked ? [0, 180, 360, 540, 720] : [0, 3, -3, 0],
          scale: isBeingAttacked ? [1, 1.2, 0.8, 0.4, 0] : 1,
        }}
        transition={{
          duration: isBeingAttacked ? 2 : 1.5,
          repeat: isBeingAttacked ? 0 : Infinity,
          ease: isBeingAttacked ? "easeInOut" : "easeInOut",
        }}
      >
        {/* Bug Wings */}
        <motion.div
          className="absolute -top-1 left-1/2 transform -translate-x-1/2"
          animate={{
            scaleY: [1, 1.15, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-3 h-2 bg-purple-400/30 rounded-full transform -rotate-12" />
          <div className="w-3 h-2 bg-purple-400/30 rounded-full transform rotate-12 -mt-1" />
        </motion.div>
        
        {/* Bug Body */}
        <div className="w-6 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full relative">
          {/* Bug Eyes */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
          
          {/* Bug Stripes */}
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-purple-300/50 rounded" />
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-purple-300/50 rounded" />
        </div>
        
        {/* Bug Antennae */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-0.5 h-2 bg-purple-400 rounded transform -rotate-12 origin-bottom" />
          <div className="w-0.5 h-2 bg-purple-400 rounded transform rotate-12 origin-bottom -ml-0.5" />
          <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-purple-300 rounded-full" />
          <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-purple-300 rounded-full" />
        </div>
        
        {/* Bug Shadow */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm" />
      </motion.div>
      
      {/* Sparkle Effect */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-1 h-1 bg-purple-400 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default CursorBug;