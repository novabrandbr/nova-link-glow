
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing animations
    containerRef.current.innerHTML = '';

    if (effect === 'none') return;

    const container = containerRef.current;
    let animationId: number;
    let elements: HTMLElement[] = [];

    const createBubbles = () => {
      const bubble = document.createElement('div');
      bubble.style.cssText = `
        position: absolute;
        width: ${Math.random() * size * 50 + 20}px;
        height: ${Math.random() * size * 50 + 20}px;
        border: 2px solid ${color};
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        opacity: ${opacity};
        pointer-events: none;
        animation: bubble-float ${20 / speed}s linear infinite;
      `;
      
      // Random starting position
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.top = Math.random() * 100 + '%';
      
      container.appendChild(bubble);
      elements.push(bubble);

      // Remove bubble after animation
      setTimeout(() => {
        if (bubble.parentNode) {
          bubble.parentNode.removeChild(bubble);
          elements = elements.filter(el => el !== bubble);
        }
      }, 20000 / speed);
    };

    const createGlitch = () => {
      const glitch = document.createElement('div');
      glitch.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: ${opacity};
        background: linear-gradient(90deg, transparent 98%, ${color} 100%);
        animation: glitch-effect ${2 / speed}s infinite;
      `;
      container.appendChild(glitch);
      elements.push(glitch);
    };

    const createLightLeak = () => {
      const leak = document.createElement('div');
      const angle = Math.random() * 360;
      leak.style.cssText = `
        position: absolute;
        width: ${size * 200}px;
        height: ${size * 100}px;
        background: linear-gradient(${angle}deg, transparent, ${color}, transparent);
        opacity: ${opacity};
        pointer-events: none;
        border-radius: 50%;
        filter: blur(20px);
        animation: light-leak ${8 / speed}s ease-in-out infinite;
      `;
      leak.style.left = Math.random() * 100 + '%';
      leak.style.top = Math.random() * 100 + '%';
      container.appendChild(leak);
      elements.push(leak);

      setTimeout(() => {
        if (leak.parentNode) {
          leak.parentNode.removeChild(leak);
          elements = elements.filter(el => el !== leak);
        }
      }, 8000 / speed);
    };

    const createVignette = () => {
      const vignette = document.createElement('div');
      vignette.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: radial-gradient(circle at center, transparent 40%, ${color} 100%);
        opacity: ${opacity};
      `;
      container.appendChild(vignette);
      elements.push(vignette);
    };

    const createFire = () => {
      const fire = document.createElement('div');
      fire.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${size * 100}px;
        background: linear-gradient(0deg, ${color}, transparent);
        opacity: ${opacity};
        pointer-events: none;
        animation: fire-flicker ${1 / speed}s ease-in-out infinite alternate;
      `;
      container.appendChild(fire);
      elements.push(fire);
    };

    const createOceanWaves = () => {
      const wave = document.createElement('div');
      wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${size * 80}px;
        background: ${color};
        opacity: ${opacity};
        pointer-events: none;
        border-radius: 50% 50% 0 0;
        animation: ocean-wave ${4 / speed}s ease-in-out infinite;
      `;
      container.appendChild(wave);
      elements.push(wave);
    };

    const createAurora = () => {
      const aurora = document.createElement('div');
      aurora.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: ${size * 150}px;
        background: linear-gradient(90deg, transparent, ${color}, transparent);
        opacity: ${opacity};
        pointer-events: none;
        filter: blur(10px);
        animation: aurora-dance ${6 / speed}s ease-in-out infinite;
      `;
      container.appendChild(aurora);
      elements.push(aurora);
    };

    const createNightSky = () => {
      // Moon
      const moon = document.createElement('div');
      moon.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: ${size * 60}px;
        height: ${size * 60}px;
        background: #FFF8DC;
        border-radius: 50%;
        opacity: ${opacity};
        pointer-events: none;
        box-shadow: 0 0 20px rgba(255, 248, 220, 0.5);
      `;
      container.appendChild(moon);
      elements.push(moon);

      // Stars
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() * size * 4 + 2}px;
          height: ${Math.random() * size * 4 + 2}px;
          background: ${color};
          border-radius: 50%;
          opacity: ${opacity};
          pointer-events: none;
          animation: star-twinkle ${Math.random() * 3 + 1}s ease-in-out infinite alternate;
        `;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 50 + '%';
        container.appendChild(star);
        elements.push(star);
      }
    };

    // Initialize effect
    switch (effect) {
      case 'bubbles':
        const bubbleInterval = setInterval(createBubbles, 2000 / speed);
        createBubbles(); // Create first bubble immediately
        return () => clearInterval(bubbleInterval);
        
      case 'glitch':
        createGlitch();
        break;
        
      case 'lightleak':
        const leakInterval = setInterval(createLightLeak, 5000 / speed);
        createLightLeak(); // Create first leak immediately
        return () => clearInterval(leakInterval);
        
      case 'vignette':
        createVignette();
        break;
        
      case 'fire':
        createFire();
        break;
        
      case 'ocean':
        createOceanWaves();
        break;
        
      case 'aurora':
        createAurora();
        break;
        
      case 'nightsky':
        createNightSky();
        break;
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      elements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [effect, color, opacity, speed, size]);

  if (effect === 'none') return null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      />
      <style>{`
        @keyframes bubble-float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-5px); }
          75% { transform: translateY(-60px) translateX(15px); }
          100% { transform: translateY(-100vh) translateX(0); }
        }
        
        @keyframes glitch-effect {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        
        @keyframes light-leak {
          0% { transform: translateX(-100%) translateY(-50%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(50%); opacity: 0; }
        }
        
        @keyframes fire-flicker {
          0% { transform: scaleY(1) scaleX(1); }
          100% { transform: scaleY(1.1) scaleX(0.95); }
        }
        
        @keyframes ocean-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes aurora-dance {
          0%, 100% { transform: translateY(0) scaleX(1); }
          33% { transform: translateY(-20px) scaleX(1.1); }
          66% { transform: translateY(-10px) scaleX(0.9); }
        }
        
        @keyframes star-twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default VisualEffect;
