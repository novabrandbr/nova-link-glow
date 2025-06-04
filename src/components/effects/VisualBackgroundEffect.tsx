
import React, { useEffect, useRef } from 'react';

interface VisualBackgroundEffectProps {
  type: string;
  color: string;
  opacity: number;
  speed: number;
  size: number;
  customUrl?: string;
}

const VisualBackgroundEffect: React.FC<VisualBackgroundEffectProps> = ({
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
        case 'rainlightning':
          animateRainLightning(ctx, particles, canvas.width, canvas.height, color, opacity, speed, size, time);
          break;
        case 'galaxy':
          animateGalaxy(ctx, particles, canvas.width, canvas.height, color, opacity, time, size);
          break;
        case 'prism':
          animatePrism(ctx, canvas.width, canvas.height, color, opacity, time, size);
          break;
        case 'vhs':
          animateVHS(ctx, canvas.width, canvas.height, color, opacity, time);
          break;
        case 'fairydust':
          animateFairyDust(ctx, particles, canvas.width, canvas.height, color, opacity, speed, size);
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
          playsInline
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

// Animation functions
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

const animateNightSky = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, size: number) => {
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

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#FFFACD';
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.15, 30 * size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

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

const animateFire = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, size: number, speed: number) => {
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

const animateLightLeak = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  const cycleTime = time % 4;
  if (cycleTime > 2) return;

  ctx.save();
  ctx.globalAlpha = opacity * (Math.sin(cycleTime * Math.PI) * 0.5 + 0.5);
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color + '00');
  gradient.addColorStop(0.3, color + '80');
  gradient.addColorStop(0.7, color + '40');
  gradient.addColorStop(1, color + '00');
  
  ctx.fillStyle = gradient;
  
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

const animateRainLightning = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, speed: number, size: number, time: number) => {
  // Rain
  if (particles.length < 100) {
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: Math.random() * width,
        y: -10,
        speedY: Math.random() * 10 * speed + 5,
        type: 'rain'
      });
    }
  }

  // Lightning
  if (Math.random() < 0.01) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, 0);
    
    let currentX = Math.random() * width;
    let currentY = 0;
    
    for (let i = 0; i < 5; i++) {
      currentX += (Math.random() - 0.5) * 100;
      currentY += height / 5;
      ctx.lineTo(currentX, currentY);
    }
    
    ctx.stroke();
    ctx.restore();
  }

  particles.forEach((particle, index) => {
    if (particle.type === 'rain') {
      particle.y += particle.speedY;
      
      if (particle.y > height) {
        particles.splice(index, 1);
        return;
      }

      ctx.save();
      ctx.globalAlpha = opacity * 0.6;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * size;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x, particle.y - 10);
      ctx.stroke();
      ctx.restore();
    }
  });
};

const animateGalaxy = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  if (particles.length < 200) {
    for (let i = particles.length; i < 200; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 300 * size,
        speed: Math.random() * 0.01 + 0.005,
        size: Math.random() * 3 * size + 1
      });
    }
  }

  particles.forEach(star => {
    star.angle += star.speed;
    star.x = width / 2 + Math.cos(star.angle) * star.radius;
    star.y = height / 2 + Math.sin(star.angle) * star.radius;
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

const animatePrism = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number, size: number) => {
  ctx.save();
  ctx.globalAlpha = opacity * 0.5;
  
  for (let i = 0; i < 5; i++) {
    const gradient = ctx.createLinearGradient(
      0, 0,
      width, height
    );
    
    const hue = (time * 50 + i * 72) % 360;
    gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0)`);
    gradient.addColorStop(0.5, `hsla(${hue}, 70%, 60%, 0.3)`);
    gradient.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  ctx.restore();
};

const animateVHS = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string, opacity: number, time: number) => {
  if (Math.random() < 0.1) {
    ctx.save();
    ctx.globalAlpha = opacity * 0.3;
    ctx.fillStyle = color;
    
    for (let i = 0; i < 3; i++) {
      const y = Math.random() * height;
      ctx.fillRect(0, y, width, 2);
    }
    ctx.restore();
  }
};

const animateFairyDust = (ctx: CanvasRenderingContext2D, particles: any[], width: number, height: number, color: string, opacity: number, speed: number, size: number) => {
  if (particles.length < 50) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      life: 1,
      decay: Math.random() * 0.01 + 0.005,
      size: Math.random() * 4 * size + 1,
      twinkle: Math.random() * Math.PI * 2
    });
  }

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life -= particle.decay;
    particle.twinkle += 0.1;

    if (particle.life <= 0) {
      particles.splice(index, 1);
      return;
    }

    const alpha = (Math.sin(particle.twinkle) + 1) * 0.5;
    
    ctx.save();
    ctx.globalAlpha = opacity * particle.life * alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * size;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

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
    particle.speedY += 0.1;
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

export default VisualBackgroundEffect;
