
import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';

interface VisualEffectProps {
  profile: UserProfile;
}

const VisualEffect: React.FC<VisualEffectProps> = ({ profile }) => {
  const [angle, setAngle] = useState(0);
  const [showEffect, setShowEffect] = useState(true);
  const [bubbleElements, setBubbleElements] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    let angleInterval: NodeJS.Timeout;
    let visibilityInterval: NodeJS.Timeout;
    let bubbleInterval: NodeJS.Timeout;
    
    // For effects that need angle variation (light leak, glitch)
    if (profile.visualEffect === 'lightleak' || profile.visualEffect === 'glitch') {
      angleInterval = setInterval(() => {
        setAngle(prevAngle => (prevAngle + 45) % 360);
      }, profile.visualEffect === 'glitch' ? 3000 : 4000);
    }
    
    // For glitch effect - appears for 1 second, disappears for 2-3 seconds
    if (profile.visualEffect === 'glitch') {
      visibilityInterval = setInterval(() => {
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1000); // Show for 1 second
      }, 4000); // Every 4 seconds (1 second on + 3 seconds off)
    }
    
    // Generate new bubble elements periodically
    if (profile.visualEffect === 'bubbles') {
      generateBubbles();
      bubbleInterval = setInterval(generateBubbles, 2000);
    }
    
    return () => {
      if (angleInterval) clearInterval(angleInterval);
      if (visibilityInterval) clearInterval(visibilityInterval);
      if (bubbleInterval) clearInterval(bubbleInterval);
    };
  }, [profile.visualEffect, profile.visualEffectSpeed]);
  
  if (profile.visualEffect === 'none') return null;
  
  // Determine opacity and color with fallbacks
  const opacity = profile.visualEffectOpacity || 0.7;
  const color = profile.visualEffectColor || '#6A0DAD';
  const speed = profile.visualEffectSpeed || 1;
  const size = profile.visualEffectSize || 1;
  
  // Helper function to apply opacity to colors
  const applyOpacity = (hexColor: string, opacity: number) => {
    let r = 0, g = 0, b = 0;
    
    if (hexColor.length === 4) {
      r = parseInt(hexColor[1] + hexColor[1], 16);
      g = parseInt(hexColor[2] + hexColor[2], 16);
      b = parseInt(hexColor[3] + hexColor[3], 16);
    } else if (hexColor.length === 7) {
      r = parseInt(hexColor.substring(1, 3), 16);
      g = parseInt(hexColor.substring(3, 5), 16);
      b = parseInt(hexColor.substring(5, 7), 16);
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  const rgba = applyOpacity(color, opacity);
  
  // Generate bubbles that look like soap bubbles with random movement
  const generateBubbles = () => {
    const count = 8;
    const newBubbles = [];
    
    for (let i = 0; i < count; i++) {
      const bubbleSize = Math.random() * 40 * size + 15;
      const startLeft = Math.random() * 100;
      const endLeft = startLeft + (Math.random() * 60 - 30); // Random horizontal drift
      const delay = Math.random() * 3;
      const duration = (Math.random() * 6 + 4) / speed;
      
      const bubbleStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: '50%',
        left: `${startLeft}%`,
        bottom: '-50px',
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), radial-gradient(circle, ${rgba} 0%, transparent 70%)`,
        border: `2px solid ${rgba}`,
        boxShadow: `0 0 20px ${rgba}, inset -10px -10px 20px rgba(255,255,255,0.3)`,
        opacity: Math.random() * 0.6 + 0.3,
        animation: `soapBubble${i} ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        zIndex: 5,
        pointerEvents: 'none'
      };
      
      const keyframes = `
        @keyframes soapBubble${i} {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: ${Math.random() * 0.6 + 0.3};
          }
          100% {
            transform: translateY(-150vh) translateX(${endLeft - startLeft}%) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `;
      
      newBubbles.push(
        <div key={`bubble-${Date.now()}-${i}`}>
          <style>{keyframes}</style>
          <div style={bubbleStyle} />
        </div>
      );
    }
    
    setBubbleElements(prevBubbles => {
      const filtered = prevBubbles.slice(-20);
      return [...filtered, ...newBubbles];
    });
  };

  // Common effect styles
  const effectStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
    zIndex: 1,
    overflow: 'hidden' as const
  };
  
  // Effect-specific rendering
  switch (profile.visualEffect) {
    case 'bubbles':
      return (
        <div style={effectStyles}>
          {bubbleElements}
        </div>
      );
      
    case 'glitch':
      return (
        <div 
          style={{
            ...effectStyles,
            backgroundImage: `repeating-linear-gradient(${angle}deg, ${rgba} 0px, transparent 2px, transparent 4px, ${rgba} 6px)`,
            opacity: showEffect ? 0.8 : 0,
            transition: 'opacity 0.1s ease',
            mixBlendMode: 'overlay'
          }} 
        />
      );
      
    case 'lightleak':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `linear-gradient(${angle}deg, ${rgba} 0%, transparent 30%, transparent 70%, ${rgba} 100%)`,
            opacity: opacity * 0.6,
            animation: `lightLeakMovement ${8/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'vignette':
      return (
        <div 
          style={{
            ...effectStyles,
            boxShadow: `inset 0 0 ${100 * size}px ${50 * size}px rgba(0, 0, 0, ${opacity})`,
          }} 
        />
      );
      
    case 'spark':
      return (
        <div style={effectStyles}>
          {generateSparks()}
        </div>
      );
      
    case 'fire':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `linear-gradient(to top, ${rgba} 0%, rgba(255,69,0,${opacity*0.8}) 30%, rgba(255,140,0,${opacity*0.6}) 60%, transparent 100%)`,
            height: `${40 * size}%`,
            bottom: 0,
            top: 'auto',
            animation: `fireFlicker ${2/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'waves':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              radial-gradient(ellipse 200% 100% at 50% 90%, transparent 40%, ${rgba} 50%, transparent 60%),
              radial-gradient(ellipse 300% 80% at 80% 100%, transparent 40%, ${applyOpacity(color, opacity*0.5)} 50%, transparent 60%),
              radial-gradient(ellipse 250% 120% at 20% 100%, transparent 40%, ${applyOpacity(color, opacity*0.3)} 50%, transparent 60%)
            `,
            animation: `oceanWaves ${6/speed}s ease-in-out infinite`
          }} 
        />
      );
      
    case 'aurora':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(${angle}deg, 
                rgba(0,255,100,${opacity*0.3}) 0%, 
                rgba(100,0,255,${opacity*0.4}) 30%, 
                rgba(0,200,255,${opacity*0.3}) 60%, 
                transparent 100%
              )
            `,
            animation: `auroraFlow ${10/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'nightsky':
      return (
        <div style={effectStyles}>
          {generateStars(100)}
          <div 
            style={{
              position: 'absolute',
              top: '10%',
              right: '20%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,200,${opacity}) 0%, rgba(200,200,255,${opacity*0.5}) 70%, transparent 100%)`,
              boxShadow: `0 0 50px rgba(255,255,200,${opacity*0.5})`
            }} 
          />
        </div>
      );
      
    case 'rain':
      return (
        <div style={effectStyles}>
          {generateRain(50)}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              animation: `lightning ${3/speed}s ease-in-out infinite`
            }} 
          />
        </div>
      );
      
    case 'galaxy':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              radial-gradient(ellipse at center, ${rgba} 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(255,100,200,${opacity*0.4}) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(100,200,255,${opacity*0.4}) 0%, transparent 50%)
            `,
            animation: `galaxyRotation ${15/speed}s linear infinite`
          }} 
        >
          {generateStars(200)}
        </div>
      );
      
    case 'prism':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(45deg, 
                rgba(255,0,150,${opacity*0.3}) 0%,
                rgba(0,255,255,${opacity*0.3}) 25%,
                rgba(255,255,0,${opacity*0.3}) 50%,
                rgba(150,0,255,${opacity*0.3}) 75%,
                rgba(255,100,0,${opacity*0.3}) 100%
              )
            `,
            animation: `prismShift ${4/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'binary':
      return (
        <div style={effectStyles}>
          {generateBinaryCode(30)}
        </div>
      );
      
    case 'vhs':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,${opacity*0.1}) 50%),
              linear-gradient(90deg, rgba(255,0,0,${opacity*0.05}), rgba(0,255,0,${opacity*0.05}), rgba(0,0,255,${opacity*0.05}))
            `,
            backgroundSize: '100% 4px, 6px 100%',
            animation: `vhsNoise ${0.5/speed}s infinite linear`
          }} 
        />
      );
      
    case 'fairy':
      return (
        <div style={effectStyles}>
          {generateFairyDust(40)}
        </div>
      );
      
    case 'paper':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              radial-gradient(circle at 20% 30%, rgba(0,0,0,${opacity*0.1}) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, rgba(0,0,0,${opacity*0.1}) 1px, transparent 1px),
              linear-gradient(135deg, rgba(255,255,255,${opacity*0.1}) 0%, rgba(0,0,0,${opacity*0.05}) 100%)
            `,
            backgroundSize: '50px 50px, 30px 30px, 100% 100%'
          }} 
        />
      );
      
    case 'kaleidoscope':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              conic-gradient(from ${angle}deg, 
                ${rgba} 0deg, 
                transparent 60deg, 
                ${applyOpacity(color, opacity*0.5)} 120deg, 
                transparent 180deg, 
                ${rgba} 240deg, 
                transparent 300deg
              )
            `,
            animation: `kaleidoscopeRotation ${6/speed}s linear infinite`
          }} 
        />
      );
      
    default:
      return null;
  }
  
  // Helper functions for generating particles
  function generateSparks() {
    const sparks = [];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      const sparkSize = Math.random() * 8 * size + 3;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 2;
      
      sparks.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${sparkSize}px`,
            height: `${sparkSize}px`,
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkSize*2}px ${color}`,
            top,
            left,
            opacity: 0,
            animation: `sparkle ${2/speed}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return sparks;
  }
  
  function generateStars(count: number) {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      const starSize = Math.random() * 3 + 1;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 3;
      
      stars.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: `0 0 ${starSize*3}px rgba(255,255,255,${opacity})`,
            top,
            left,
            animation: `twinkle ${3/speed}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return stars;
  }
  
  function generateRain(count: number) {
    const drops = [];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 2;
      const duration = (Math.random() * 1 + 0.5) / speed;
      
      drops.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '20px',
            background: `linear-gradient(to bottom, transparent, ${rgba})`,
            left,
            top: '-20px',
            animation: `rainDrop ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return drops;
  }
  
  function generateBinaryCode(count: number) {
    const codes = [];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      const duration = (Math.random() * 3 + 2) / speed;
      
      codes.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            left,
            top: '-20px',
            color: rgba,
            fontFamily: 'monospace',
            fontSize: `${12 * size}px`,
            animation: `binaryFall ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      );
    }
    
    return codes;
  }
  
  function generateFairyDust(count: number) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particleSize = Math.random() * 4 + 2;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 4;
      
      particles.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${particleSize}px`,
            height: `${particleSize}px`,
            background: `radial-gradient(circle, ${rgba} 0%, transparent 70%)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particleSize*4}px ${color}`,
            top,
            left,
            animation: `fairyFloat ${4/speed}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return particles;
  }
};

export default VisualEffect;
