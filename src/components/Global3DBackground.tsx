import { useEffect, useRef } from 'react';
import type { WebGLRenderer } from 'three';

export function Global3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lightweight = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    let disposeScene: (() => void) | undefined;
    let failed = false;
    let disposed = false;
    let loading = false;

    const startScene = async () => {
      loading = true;
      let THREE: typeof import('three');
      try { THREE = await import('three'); }
      catch { failed = true; return; }
      finally { loading = false; }
      if (disposed || reducedMotion.matches || lightweight.matches) return;
      let renderer: WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch {
        failed = true;
        return;
      }
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
      camera.position.z = 70;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.opacity = '0.65';
      container.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(120 * 3);
      for (let index = 0; index < positions.length; index++) positions[index] = (Math.random() - 0.5) * 150;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ size: 0.28, color: 0xfbbf24, transparent: true, opacity: 0.5, depthWrite: false });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      const shapeGeometry = new THREE.IcosahedronGeometry(17, 1);
      const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.055 });
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
      shape.position.set(42, 8, -25);
      scene.add(shape);

      let frame = 0;
      let lastTime = 0;
      let elapsed = 0;
      let stopped = false;
      const resize = () => {
        const width = window.innerWidth;
        const height = Math.max(1, window.innerHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height);
      };
      const animate = (time: number) => {
        if (stopped) return;
        frame = requestAnimationFrame(animate);
        // Decorative work is capped at 30fps and paused in hidden tabs.
        if (time - lastTime < 1000 / 30) return;
        elapsed += Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;
        particles.rotation.y = elapsed * 0.015;
        particles.rotation.x = Math.sin(elapsed * 0.06) * 0.08;
        shape.rotation.y = elapsed * 0.035;
        shape.rotation.z = elapsed * 0.018;
        try {
          renderer.render(scene, camera);
        } catch {
          failed = true;
          disposeScene?.();
          disposeScene = undefined;
        }
      };
      const visibility = () => {
        cancelAnimationFrame(frame);
        if (!document.hidden && !stopped) {
          lastTime = performance.now();
          frame = requestAnimationFrame(animate);
        }
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        failed = true;
        disposeScene?.();
        disposeScene = undefined;
      };
      disposeScene = () => {
        stopped = true;
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', visibility);
        renderer.domElement.removeEventListener('webglcontextlost', contextLost);
        geometry.dispose();
        material.dispose();
        shapeGeometry.dispose();
        shapeMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', visibility);
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      resize();
      visibility();
    };
    const update = () => {
      if (reducedMotion.matches || lightweight.matches) {
        disposeScene?.();
        disposeScene = undefined;
      } else if (!disposeScene && !failed && !loading) {
        startScene();
      }
    };
    reducedMotion.addEventListener('change', update);
    lightweight.addEventListener('change', update);
    update();
    return () => {
      disposed = true;
      reducedMotion.removeEventListener('change', update);
      lightweight.removeEventListener('change', update);
      disposeScene?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at 85% 15%, rgba(245,158,11,0.065), transparent 45%), radial-gradient(ellipse at 10% 70%, rgba(148,163,184,0.035), transparent 45%)' }} />
  );
}
