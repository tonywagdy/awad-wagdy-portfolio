import { useEffect, useRef } from 'react';

export function InteractiveCursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const dot = dotRef.current;
    if (!aura || !dot) return;
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let enabled = false;
    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    const hide = () => {
      visible = false;
      aura.style.opacity = '0';
      dot.style.opacity = '0';
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = () => {
      frame = 0;
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      aura.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (!enabled || event.pointerType === 'touch') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        aura.style.opacity = '1';
        dot.style.opacity = '1';
      }
      const clickable = event.target instanceof Element && !!event.target.closest('a, button, input, select, textarea, [role="button"]');
      dot.style.width = clickable ? '28px' : '8px';
      dot.style.height = clickable ? '28px' : '8px';
      dot.style.background = clickable ? 'rgba(251,191,36,0.08)' : 'rgba(251,191,36,0.8)';
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const update = () => {
      enabled = pointer.matches && !reducedMotion.matches && !document.hidden;
      if (!enabled) hide();
    };
    pointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    update();
    return () => {
      hide();
      pointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  }, []);

  return (
    <>
      <div ref={auraRef} aria-hidden="true" className="fixed left-0 top-0 pointer-events-none z-0 rounded-full" style={{ opacity: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%)' }} />
      <div ref={dotRef} aria-hidden="true" className="fixed left-0 top-0 pointer-events-none z-50 rounded-full" style={{ opacity: 0, width: 8, height: 8, border: '1px solid rgba(251,191,36,0.7)' }} />
    </>
  );
}
