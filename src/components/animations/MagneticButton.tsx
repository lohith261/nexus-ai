'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({ 
  children, 
  className, 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'box-shadow 0.3s ease',
        boxShadow: isHovered 
          ? '0 0 30px rgba(0, 240, 255, 0.3)' 
          : '0 0 0px rgba(0, 240, 255, 0)',
      }}
    >
      {children}
    </button>
  );
}