'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(
      chars,
      { 
        opacity: 0, 
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay, text]);

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}