'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}

export function StaggerContainer({ 
  children, 
  className, 
  stagger = 0.1, 
  y = 50 
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stagger-item',
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}