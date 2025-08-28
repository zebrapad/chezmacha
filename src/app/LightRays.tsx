'use client';

import React, { useEffect, useRef } from 'react';

interface LightRaysProps {
  raysOrigin?: 'top-center' | 'top-left' | 'top-right' | 'center' | 'bottom-center';
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = '#00ffff',
  raysSpeed = 1.5,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.05,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation variables
    let time = 0;
    const numRays = 20;
    const rays: Array<{
      angle: number;
      length: number;
      speed: number;
      noise: number;
    }> = [];

    // Initialize rays
    for (let i = 0; i < numRays; i++) {
      rays.push({
        angle: (i / numRays) * Math.PI * 2,
        length: rayLength + Math.random() * 0.5,
        speed: raysSpeed + Math.random() * 0.5,
        noise: Math.random() * Math.PI * 2
      });
    }

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set origin point based on raysOrigin prop
      let originX = width / 2;
      let originY = height / 2;

      switch (raysOrigin) {
        case 'top-center':
          originY = 0;
          break;
        case 'top-left':
          originX = 0;
          originY = 0;
          break;
        case 'top-right':
          originX = width;
          originY = 0;
          break;
        case 'bottom-center':
          originY = height;
          break;
      }

      // Apply mouse influence
      if (followMouse) {
        originX += (mouseRef.current.x - originX) * mouseInfluence;
        originY += (mouseRef.current.y - originY) * mouseInfluence;
      }

      // Draw rays
      rays.forEach((ray) => {
        const angle = ray.angle + time * ray.speed * 0.01;
        const length = ray.length * Math.min(width, height) * 0.8;
        
        // Add noise and distortion
        const noiseAngle = Math.sin(time * 0.01 + ray.noise) * noiseAmount;
        const distortedAngle = angle + noiseAngle;
        
        const endX = originX + Math.cos(distortedAngle) * length;
        const endY = originY + Math.sin(distortedAngle) * length;

        // Create gradient
        const gradient = ctx.createLinearGradient(originX, originY, endX, endY);
        gradient.addColorStop(0, raysColor);
        gradient.addColorStop(lightSpread, raysColor + '80');
        gradient.addColorStop(1, 'transparent');

        // Draw ray
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = raysColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (followMouse) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default LightRays;
