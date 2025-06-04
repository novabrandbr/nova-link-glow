
import React, { useEffect, useRef } from 'react';

interface VisualEffectProps {
  effect: string;
  color: string;
  opacity: number;
  speed: number;
  size: number;
  customUrl?: string;
}

const VisualEffect: React.FC<VisualEffectProps> = ({ 
  effect, 
  color, 
  opacity, 
  speed, 
  size,
  customUrl 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      switch (effect) {
        case 'bubbles':
          renderBubbles(ctx, canvas);
          break;
        case 'glitch':
          renderGlitch(ctx, canvas);
          break;
        case 'aurora':
          renderAurora(ctx, canvas);
          break;
        case 'night':
          renderNightSky(ctx, canvas);
          break;
        case 'fire':
          renderFire(ctx, canvas);
          break;
        case 'waves':
          renderWaves(ctx, canvas);
          break;
        case 'lightLeak':
          renderLightLeak(ctx, canvas);
          break;
        case 'vignette':
          renderVignette(ctx, canvas);
          break;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [effect, color, opacity, speed, size]);

  const renderBubbles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const bubbles = 15;
    const time = Date.now() * speed * 0.001;
    
    ctx.globalAlpha = opacity;
    
    for (let i = 0; i < bubbles; i++) {
      const x = (canvas.width * (i / bubbles + Math.sin(time + i) * 0.1)) % canvas.width;
      const y = (canvas.height * 0.8 - ((time * 20 + i * 100) % (canvas.height * 1.2)));
      const radius = size * (10 + Math.sin(time + i) * 5);
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color + '40';
      ctx.fill();
      ctx.strokeStyle = color + '80';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const renderGlitch = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (Math.random() < 0.95) return;
    
    ctx.globalAlpha = opacity;
    const time = Date.now() * speed * 0.01;
    
    for (let i = 0; i < 5; i++) {
      const y = Math.random() * canvas.height;
      const height = Math.random() * 50 + 10;
      const offset = (Math.sin(time + i) * 20);
      
      ctx.fillStyle = color;
      ctx.fillRect(offset, y, canvas.width, height);
    }
    
    ctx.globalAlpha = 1;
  };

  const renderAurora = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * speed * 0.001;
    ctx.globalAlpha = opacity;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color + '00');
    gradient.addColorStop(0.5, color + '60');
    gradient.addColorStop(1, color + '00');
    
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 10) {
      const y = canvas.height * 0.3 + Math.sin((x + time * 100) * 0.01) * 50 * size;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1;
  };

  const renderNightSky = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * speed * 0.001;
    ctx.globalAlpha = opacity;
    
    // Lua
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 30 * size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    
    // Estrelas
    for (let i = 0; i < 50; i++) {
      const x = (i * 123.45) % canvas.width;
      const y = (i * 67.89) % canvas.height;
      const twinkle = Math.sin(time + i) * 0.5 + 0.5;
      
      ctx.globalAlpha = opacity * twinkle;
      ctx.beginPath();
      ctx.arc(x, y, 2 * size, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  };

  const renderFire = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * speed * 0.001;
    ctx.globalAlpha = opacity;
    
    for (let i = 0; i < 20; i++) {
      const x = canvas.width * 0.5 + Math.sin(time + i) * 50;
      const y = canvas.height - (time * 100 + i * 50) % canvas.height;
      const radius = size * (20 - (y / canvas.height) * 15);
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#FF4500');
      gradient.addColorStop(0.5, '#FF6B00');
      gradient.addColorStop(1, '#FF000000');
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  };

  const renderWaves = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * speed * 0.001;
    ctx.globalAlpha = opacity;
    
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = color + '80';
      ctx.lineWidth = 3;
      
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.8 + Math.sin((x + time * 50 + wave * 100) * 0.01) * 20 * size;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const renderLightLeak = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * speed * 0.001;
    
    if (Math.sin(time) > 0.7) {
      ctx.globalAlpha = opacity;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color + '00');
      gradient.addColorStop(0.3, color + '60');
      gradient.addColorStop(0.7, color + '60');
      gradient.addColorStop(1, color + '00');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.globalAlpha = 1;
  };

  const renderVignette = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.globalAlpha = opacity;
    
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7 * size
    );
    gradient.addColorStop(0, '#00000000');
    gradient.addColorStop(1, '#000000FF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalAlpha = 1;
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default VisualEffect;
