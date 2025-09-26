'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cat, Code, Database, Cpu, Zap, Heart } from 'lucide-react';

interface FloatingIconsProps {
  onGitHubCatClick: () => void;
  bugPosition: { x: number; y: number };
  isFollowingCursor: boolean;
}

const FloatingIcons = ({ onGitHubCatClick, bugPosition, isFollowingCursor }: FloatingIconsProps) => {
  const [icons, setIcons] = useState([
    { id: 1, icon: Cat, x: 20, y: 20, color: 'text-orange-400', isCat: true },
    { id: 2, icon: Code, x: 80, y: 60, color: 'text-blue-400' },
    { id: 3, icon: Database, x: 60, y: 80, color: 'text-green-400' },
    { id: 4, icon: Cpu, x: 40, y: 40, color: 'text-purple-400' },
    { id: 5, icon: Zap, x: 70, y: 30, color: 'text-yellow-400' },
    { id: 6, icon: Heart, x: 30, y: 70, color: 'text-pink-400' },
  ]);

  const [isAttacking, setIsAttacking] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 20, y: 20 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catPixelPosition, setCatPixelPosition] = useState({ x: 0, y: 0 });

  // Track mouse position when cat is following cursor
  useEffect(() => {
    if (!isFollowingCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFollowingCursor]);

  // Make cat follow cursor when it's the active follower
  useEffect(() => {
    if (!isFollowingCursor) return;

    let animationFrameId: number;
    
    const followMouse = () => {
      setCatPixelPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const minDistance = 5;
        const maxDistance = 300;
        
        let targetX = prev.x;
        let targetY = prev.y;
        
        if (distance > maxDistance) {
          const angle = Math.atan2(dy, dx);
          targetX = mousePosition.x - Math.cos(angle) * minDistance;
          targetY = mousePosition.y - Math.sin(angle) * minDistance;
        } else if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          targetX = mousePosition.x - Math.cos(angle) * minDistance;
          targetY = mousePosition.y - Math.sin(angle) * minDistance;
        } else {
          targetX = mousePosition.x;
          targetY = mousePosition.y;
        }
        
        const lerpFactor = 0.12;
        return {
          x: prev.x + (targetX - prev.x) * lerpFactor,
          y: prev.y + (targetY - prev.y) * lerpFactor,
        };
      });
      
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition, isFollowingCursor]);

  const handleIconClick = (iconId: number) => {
    const icon = icons.find(i => i.id === iconId);
    if (icon?.isCat && !isAttacking && !isFollowingCursor) {
      setIsAttacking(true);
      
      // Move cat towards bug position
      const targetX = (bugPosition.x / window.innerWidth) * 100;
      const targetY = (bugPosition.y / window.innerHeight) * 100;
      
      setCatPosition({ x: targetX, y: targetY });
      
      // Trigger bug attack after cat reaches bug
      setTimeout(() => {
        onGitHubCatClick();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {icons.map((iconData) => {
        const Icon = iconData.icon;
        let currentX, currentY;
        
        if (iconData.isCat && isFollowingCursor) {
          // Use pixel coordinates when cat is following cursor
          currentX = (catPixelPosition.x / window.innerWidth) * 100;
          currentY = (catPixelPosition.y / window.innerHeight) * 100;
        } else {
          // Use percentage coordinates for normal positioning
          currentX = iconData.isCat ? catPosition.x : iconData.x;
          currentY = iconData.isCat ? catPosition.y : iconData.y;
        }
        
        return (
          <motion.div
            key={iconData.id}
            className={`absolute pointer-events-auto cursor-pointer ${iconData.color} ${
              iconData.isCat ? 'hover:scale-110' : 'hover:scale-105'
            } transition-transform duration-200`}
            style={{
              left: `${currentX}%`,
              top: `${currentY}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: iconData.isCat ? 1 : 0.3, 
              scale: isAttacking && iconData.isCat ? 1.8 : (isFollowingCursor && iconData.isCat ? 1.2 : 1),
              rotate: isAttacking && iconData.isCat ? [0, -15, 15, -15, 0] : 0,
              y: isFollowingCursor && iconData.isCat ? 0 : [0, -25, 0],
              x: isFollowingCursor && iconData.isCat ? 0 : [0, 15, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.3 },
              rotate: { duration: 0.5, repeat: isAttacking && iconData.isCat ? 1 : 0 },
              y: { 
                duration: 3, 
                repeat: isFollowingCursor && iconData.isCat ? 0 : Infinity, 
                ease: "easeInOut",
                delay: iconData.id * 0.5
              },
              x: { 
                duration: 4, 
                repeat: isFollowingCursor && iconData.isCat ? 0 : Infinity, 
                ease: "easeInOut",
                delay: iconData.id * 0.3
              },
            }}
            whileHover={{ 
              scale: iconData.isCat ? 1.2 : 1.1,
              rotate: iconData.isCat ? [0, -5, 5, 0] : 0,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleIconClick(iconData.id)}
          >
            <div className="relative">
              <Icon size={24} />
              {iconData.isCat && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;
