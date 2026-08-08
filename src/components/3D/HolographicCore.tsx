import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HolographicCoreProps {
  isCycling?: boolean;
  className?: string;
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({ isCycling = false, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isCyclingRef = useRef(isCycling);

  useEffect(() => {
    isCyclingRef.current = isCycling;
  }, [isCycling]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Icosahedron (Neural Mesh Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Inner Glowing Particle Point Cloud
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.4 + Math.random() * 0.5;

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8, // Cyan/Blue neon
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 3. Orbital Holographic Rings
    const createRing = (radius: number, color: number, rx: number, ry: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rx;
      ringMesh.rotation.y = ry;
      return ringMesh;
    };

    const ring1 = createRing(2.0, 0xa855f7, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.4, 0x3b82f6, -Math.PI / 4, Math.PI / 3);
    const ring3 = createRing(2.8, 0x06b6d4, Math.PI / 2, 0);

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const cycling = isCyclingRef.current;

      const speedMultiplier = cycling ? 2.5 : 1.0;

      // Rotations
      coreMesh.rotation.x = elapsedTime * 0.2 * speedMultiplier;
      coreMesh.rotation.y = elapsedTime * 0.3 * speedMultiplier;

      particles.rotation.y = -elapsedTime * 0.15 * speedMultiplier;

      ring1.rotation.z = elapsedTime * 0.4 * speedMultiplier;
      ring2.rotation.z = -elapsedTime * 0.3 * speedMultiplier;
      ring3.rotation.x = elapsedTime * 0.25 * speedMultiplier;

      // Pulse color or scale on cycle
      if (cycling) {
        coreMat.color.setHex(0xd8b4fe); // Lighter purple glow
        const scalePulse = 1 + Math.sin(elapsedTime * 8) * 0.08;
        coreMesh.scale.set(scalePulse, scalePulse, scalePulse);
      } else {
        coreMat.color.setHex(0x8b5cf6);
        coreMesh.scale.set(1, 1, 1);
      }

      // Gentle camera parallax following mouse
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
    />
  );
};
