import React, { useEffect, useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'blue' | 'emerald' | 'cyan' | 'purple';
  maxTilt?: number;
  scale?: number;
  onClick?: () => void;
}

export function TiltCard({ children, className = '', glowColor = 'amber', maxTilt = 8, scale = 1.02, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const glowColors = {
    amber: 'rgba(245,158,11,0.12)', blue: 'rgba(59,130,246,0.12)',
    emerald: 'rgba(16,185,129,0.12)', cyan: 'rgba(6,182,212,0.12)', purple: 'rgba(168,85,247,0.12)'
  };
  const glow = glowColors[glowColor];

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let enabled = false;
    let frame = 0;
    let rect: DOMRect | undefined;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      rect = undefined;
      card.style.transform = '';
      card.style.willChange = '';
      glare.style.opacity = '0';
    };
    const preferences = () => {
      enabled = !motion.matches && pointer.matches;
      card.style.transition = enabled ? 'transform 180ms ease-out' : 'none';
      reset();
    };
    const move = (event: PointerEvent) => {
      if (!enabled || event.pointerType === 'touch') return;
      rect ??= card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        card.style.willChange = 'transform';
        card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * maxTilt * 2}deg) rotateY(${(x - 0.5) * maxTilt * 2}deg) scale(${scale})`;
        glare.style.background = `radial-gradient(circle 280px at ${x * 100}% ${y * 100}%, ${glow}, transparent 70%)`;
        glare.style.opacity = '1';
      });
    };
    preferences();
    motion.addEventListener('change', preferences);
    pointer.addEventListener('change', preferences);
    card.addEventListener('pointermove', move, { passive: true });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    window.addEventListener('resize', reset);
    window.addEventListener('scroll', reset, { passive: true });
    return () => {
      reset();
      motion.removeEventListener('change', preferences);
      pointer.removeEventListener('change', preferences);
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', reset);
      card.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('resize', reset);
      window.removeEventListener('scroll', reset);
    };
  }, [maxTilt, scale, glow]);

  return (
    <div ref={cardRef} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? event => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      } : undefined}
      className={`relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${className}`}>
      <div ref={glareRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}
