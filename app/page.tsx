'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Navigation from '@/components/layout/Navigation';
import CursorBug from '@/components/ui/CursorBug';
import FloatingIcons from '@/components/ui/FloatingIcons';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isBugAttacked, setIsBugAttacked] = useState(false);
  const [isCatFollowingCursor, setIsCatFollowingCursor] = useState(false);
  const [bugPosition, setBugPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  const handleGitHubCatClick = () => {
    setIsBugAttacked(true);
    setIsCatFollowingCursor(true);
  };

  const handleAttackComplete = () => {
    setIsBugAttacked(false);
  };

  const handleBugPositionChange = (position: { x: number; y: number }) => {
    setBugPosition(position);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <Navigation />
      
          {/* Cursor Following Bug */}
          <CursorBug 
            isAttacked={isBugAttacked} 
            onAttackComplete={handleAttackComplete}
            shouldFollowCursor={!isCatFollowingCursor}
            onPositionChange={handleBugPositionChange}
          />
          
          {/* Floating Icons */}
          <FloatingIcons 
            onGitHubCatClick={handleGitHubCatClick}
            bugPosition={bugPosition}
            isFollowingCursor={isCatFollowingCursor}
          />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      
      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      
      {/* Floating shapes */}
      <div className="fixed top-1/4 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl float" />
      <div className="fixed bottom-1/4 right-10 w-48 h-48 bg-pink-500/10 rounded-full blur-xl float" style={{ animationDelay: '3s' }} />
    </main>
  );
}