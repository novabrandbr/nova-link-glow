
import React, { useEffect, useRef } from 'react';

interface VisualEffectProps {
  type: string;
  color: string;
  opacity: number;
  speed: number;
  size: number;
  customUrl?: string;
}

const VisualEffect: React.FC<VisualEffectProps> = ({
  type,
  color,
  opacity,
  speed,
  size,
  customUrl
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (type === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles: any[] = [];
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += speed * 0.01;

      switch (type) {
        case 'bubbles':
          animateBubbles(ctx, particles, canvas.width, canvas.height, color, opacity, size, speed);
          break;
        case 'glitch':
          animateGlitch(ctx, canvas.width, canvas.height, color, opacity, time);
          break;
        case 'aurora':
          animateAurora(ctx, canvas.width, canvas.height, color, opacity, time, size);
          break;
        case 'nightsky':
          animateNightSky(ctx, particles, canvas.width, canvas.height, color, opacity, size);
          break;
        case 'fire':
          animateFire(ctx, particles, canvas.width, canvas.height, color, opacity, size, speed);
          break;
        case 'ocean':
          animateOcean(ctx, canvas.width, canvas.height, color, opacity, time, size);
          break;
        case 'lightleak':
          animateLightLeak(ctx, canvas.width, canvas.height, color, opacity, time, size);
          break;
        case 'vignette':
          animateVignette(ctx, canvas.width, canvas.height, color, opacity);
          break;
        case 'shootingstars':
          animateShootingStars(ctx, particles, canvas.width, canvas.height, color, opacity, speed, size);
          break;
        case 'smoke':
          animateSmoke(ctx, particles, canvas.width, canvas.height, color, opacity, speed, size);
          break;
        case 'fireworks':
          animateFireworks(ctx, particles, canvas.width, canvas.height, color, opacity, speed, size);
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
  }, [type, color, opacity, speed, size]);

  if (type === 'none') return null;

  if (type === 'custom' && customUrl) {
    if (customUrl.startsWith('data:image')) {
      return (
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${customUrl})`,
            backgroundSize: `${size * 100}%`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: opacity,
            filter: `hue-rotate(${color})`
          }}
        />
      );
    } else if (customUrl.startsWith('data:video')) {
      return (
        <video
          className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{
            opacity: opacity,
            transform: `scale(${size})`,
            filter: `hue-rotate(${color})`
          }}
          autoPlay
          muted
          loop
          src={customUrl}
        />
      );
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: opacity,
        mixBlendMode: type === 'lightleak' ? 'screen' : 'normal'
      }}
    />
  );
};

// Bubble animation
const animateBubbles = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, size: number, speed: number) => {
  if (particles.length < 20) {
    particles.push({
      x: Math.random() * width,
      y: height + 50,
      radius: Math.random() * 60 * size + 10,
      speedY: -Math.random() * 2 * speed - 1,
      speedX: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.7 + 0.1
    });
  }

  particles.forEach((particle, index) => {
    particle.y += particle.speedY;
    particle.x += particle.speedX;

    if (particle.y < -100) {
      particles.splice(index, 1);
      return;
    }

    ctx.save();
    ctx.globalAlpha = particle.opacity * opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });
};

// Glitch animation
const animateGlitch = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number) => {
  if (Math.random() < 0.1) {
    ctx.save();
    ctx.globalAlpha = opacity * 0.3;
    ctx.fillStyle = color;
    
    for (let i = 0; i < 5; i++) {
      const y = Math.random() * height;
      const h = Math.random() * 20 + 2;
      ctx.fillRect(0, y, width, h);
    }
    ctx.restore();
  }
};

// Aurora animation
const animateAurora = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  ctx.save();
  ctx.globalAlpha = opacity * 0.6;
  
  const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
  gradient.addColorStop(0, color + '00');
  gradient.addColorStop(0.5, color + '80');
  gradient.addColorStop(1, color + '00');
  
  ctx.fillStyle = gradient;
  
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    
    for (let x = 0; x <= width; x += 20) {
      const y = height * 0.3 + Math.sin((x * 0.01) + time + i) * 100 * size;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
};

// Night sky animation
const animateNightSky = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, size: number) => {
  // Initialize stars
  if (particles.length < 100) {
    for (let i = particles.length; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 * size + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  // Draw moon
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#FFFACD';
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.15, 30 * size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw stars
  particles.forEach(star => {
    star.twinkle += star.twinkleSpeed;
    const alpha = (Math.sin(star.twinkle) + 1) * 0.5;
    
    ctx.save();
    ctx.globalAlpha = opacity * alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

// Fire animation
const animateFire = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, size: number, speed: number) => {
  // Add new particles
  if (particles.length < 50) {
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: Math.random() * width,
        y: height,
        speedY: -Math.random() * 3 * speed - 1,
        speedX: (Math.random() - 0.5) * speed,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        size: Math.random() * 20 * size + 5
      });
    }
  }

  particles.forEach((particle, index) => {
    particle.y += particle.speedY;
    particle.x += particle.speedX;
    particle.life -= particle.decay;

    if (particle.life <= 0) {
      particles.splice(index, 1);
      return;
    }

    ctx.save();
    ctx.globalAlpha = opacity * particle.life;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

// Ocean animation
const animateOcean = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3 * size;
  
  const waveHeight = 20 * size;
  const y = height - 50;
  
  ctx.beginPath();
  ctx.moveTo(0, y);
  
  for (let x = 0; x <= width; x += 5) {
    const waveY = y + Math.sin((x * 0.02) + time) * waveHeight;
    ctx.lineTo(x, waveY);
  }
  
  ctx.stroke();
  ctx.restore();
};

// Light leak animation
const animateLightLeak = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  const cycleTime = time % 4;
  if (cycleTime > 2) return; // 2s on, 2s off cycle

  ctx.save();
  ctx.globalAlpha = opacity * (Math.sin(cycleTime * Math.PI) * 0.5 + 0.5);
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color + '00');
  gradient.addColorStop(0.3, color + '80');
  gradient.addColorStop(0.7, color + '40');
  gradient.addColorStop(1, color + '00');
  
  ctx.fillStyle = gradient;
  
  // Create diagonal light beams
  for (let i = 0; i < 3; i++) {
    const rotation = (i * 45 + time * 10) * Math.PI / 180;
    const centerX = width * (0.2 + i * 0.3);
    const centerY = height * 0.5;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.fillRect(-width * size, -50 * size, width * 2 * size, 100 * size);
    ctx.restore();
  }
  
  ctx.restore();
};

// Vignette animation
const animateVignette = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number) => {
  ctx.save();
  ctx.globalAlpha = opacity;
  
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, Math.max(width, height) * 0.7
  );
  gradient.addColorStop(0, color + '00');
  gradient.addColorStop(1, color + 'FF');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
};

// Shooting stars animation
const animateShootingStars = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, speed: number, size: number) => {
  if (Math.random() < 0.005 && particles.length < 5) {
    particles.push({
      x: -50,
      y: Math.random() * height * 0.5,
      speedX: Math.random() * 8 * speed + 4,
      speedY: Math.random() * 2 * speed + 1,
      life: 1,
      decay: 0.02,
      tail: []
    });
  }

  particles.forEach((star, index) => {
    star.x += star.speedX;
    star.y += star.speedY;
    star.life -= star.decay;

    star.tail.push({ x: star.x, y: star.y, life: star.life });
    if (star.tail.length > 20) star.tail.shift();

    if (star.life <= 0 || star.x > width + 50) {
      particles.splice(index, 1);
      return;
    }

    // Draw tail
    star.tail.forEach((point: any, i: number) => {
      const alpha = (point.life * (i / star.tail.length)) * opacity;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  });
};

// Smoke animation
const animateSmoke = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, speed: number, size: number) => {
  if (particles.length < 30) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 100,
      y: height,
      speedY: -Math.random() * 2 * speed - 0.5,
      speedX: (Math.random() - 0.5) * speed,
      life: 1,
      decay: Math.random() * 0.01 + 0.005,
      size: Math.random() * 30 * size + 10
    });
  }

  particles.forEach((particle, index) => {
    particle.y += particle.speedY;
    particle.x += particle.speedX;
    particle.life -= particle.decay;
    particle.size += 0.5;

    if (particle.life <= 0) {
      particles.splice(index, 1);
      return;
    }

    ctx.save();
    ctx.globalAlpha = opacity * particle.life * 0.3;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

// Fireworks animation
const animateFireworks = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, speed: number, size: number) => {
  if (Math.random() < 0.02 && particles.length < 200) {
    const centerX = Math.random() * width;
    const centerY = Math.random() * height * 0.5 + height * 0.1;
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      particles.push({
        x: centerX,
        y: centerY,
        speedX: Math.cos(angle) * Math.random() * 5 * speed,
        speedY: Math.sin(angle) * Math.random() * 5 * speed,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        size: Math.random() * 4 * size + 2
      });
    }
  }

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.speedY += 0.1; // gravity
    particle.life -= particle.decay;

    if (particle.life <= 0) {
      particles.splice(index, 1);
      return;
    }

    ctx.save();
    ctx.globalAlpha = opacity * particle.life;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

export default VisualEffect;
