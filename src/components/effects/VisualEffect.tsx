import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';

interface VisualEffectProps {
  profile: UserProfile;
}

const VisualEffect: React.FC<VisualEffectProps> = ({ profile }) => {
  const [angle, setAngle] = useState(0);
  const [showEffect, setShowEffect] = useState(true);
  const [bubbleElements, setBubbleElements] = useState<React.ReactNode[]>([]);
  const [auroraPhase, setAuroraPhase] = useState(0);
  
  useEffect(() => {
    let angleInterval: NodeJS.Timeout;
    let visibilityInterval: NodeJS.Timeout;
    let bubbleInterval: NodeJS.Timeout;
    let auroraInterval: NodeJS.Timeout;
    
    // For aurora effect
    if (profile.visualEffect === 'aurora') {
      auroraInterval = setInterval(() => {
        setAuroraPhase(prev => (prev + 1) % 360);
      }, 100);
    }
    
    // For effects that need angle variation
    if (profile.visualEffect === 'lightleak' || profile.visualEffect === 'glitch') {
      angleInterval = setInterval(() => {
        setAngle(prevAngle => (prevAngle + 45) % 360);
      }, profile.visualEffect === 'glitch' ? 3000 : 4000);
    }
    
    // For glitch effect - appears for 1 second, disappears for 2-3 seconds
    if (profile.visualEffect === 'glitch') {
      visibilityInterval = setInterval(() => {
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1000);
      }, 4000);
    }
    
    // Generate soap bubbles from random angles
    if (profile.visualEffect === 'bubbles') {
      generateSoapBubbles();
      bubbleInterval = setInterval(generateSoapBubbles, 2000);
    }
    
    return () => {
      if (angleInterval) clearInterval(angleInterval);
      if (visibilityInterval) clearInterval(visibilityInterval);
      if (bubbleInterval) clearInterval(bubbleInterval);
      if (auroraInterval) clearInterval(auroraInterval);
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
  
  // Generate realistic soap bubbles from random angles and positions
  const generateSoapBubbles = () => {
    const count = Math.floor(Math.random() * 5) + 2; // 2-6 bubbles
    const newBubbles = [];
    
    for (let i = 0; i < count; i++) {
      const bubbleSize = Math.random() * 80 * size + 30;
      
      // Random starting positions from different angles
      const startPositions = [
        { side: 'bottom', left: Math.random() * 100, top: 110, direction: 'up' },
        { side: 'left', left: -15, top: Math.random() * 100, direction: 'right' },
        { side: 'right', left: 115, top: Math.random() * 100, direction: 'left' },
        { side: 'top', left: Math.random() * 100, top: -15, direction: 'down' },
        { side: 'corner-bl', left: -10, top: 110, direction: 'diagonal-up-right' },
        { side: 'corner-br', left: 110, top: 110, direction: 'diagonal-up-left' },
        { side: 'corner-tl', left: -10, top: -10, direction: 'diagonal-down-right' },
        { side: 'corner-tr', left: 110, top: -10, direction: 'diagonal-down-left' }
      ];
      
      const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
      const duration = (Math.random() * 8 + 6) / speed;
      const delay = Math.random() * 3;
      const rotation = Math.random() * 360;
      
      // Movement based on direction
      let endLeft = startPos.left;
      let endTop = startPos.top;
      
      switch (startPos.direction) {
        case 'up':
          endTop = -20;
          endLeft += (Math.random() - 0.5) * 40;
          break;
        case 'down':
          endTop = 120;
          endLeft += (Math.random() - 0.5) * 40;
          break;
        case 'right':
          endLeft = 120;
          endTop += (Math.random() - 0.5) * 40;
          break;
        case 'left':
          endLeft = -20;
          endTop += (Math.random() - 0.5) * 40;
          break;
        case 'diagonal-up-right':
          endLeft = 120;
          endTop = -20;
          break;
        case 'diagonal-up-left':
          endLeft = -20;
          endTop = -20;
          break;
        case 'diagonal-down-right':
          endLeft = 120;
          endTop = 120;
          break;
        case 'diagonal-down-left':
          endLeft = -20;
          endTop = 120;
          break;
      }
      
      const bubbleStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: '50%',
        left: `${startPos.left}%`,
        top: `${startPos.top}%`,
        background: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8), transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4), transparent 30%),
          radial-gradient(circle, transparent 60%, ${rgba} 70%, transparent 80%)
        `,
        border: `2px solid ${rgba}`,
        boxShadow: `
          0 0 ${bubbleSize/3}px ${applyOpacity(color, opacity * 0.4)},
          inset -${bubbleSize/6}px -${bubbleSize/6}px ${bubbleSize/4}px rgba(255,255,255,0.6),
          inset ${bubbleSize/8}px ${bubbleSize/8}px ${bubbleSize/5}px rgba(255,255,255,0.3)
        `,
        opacity: Math.random() * 0.6 + 0.4,
        animation: `soapBubbleFloat${i} ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        zIndex: 1,
        pointerEvents: 'none',
        transform: `rotate(${rotation}deg)`
      };
      
      const keyframes = `
        @keyframes soapBubbleFloat${i} {
          0% {
            transform: translateY(0) translateX(0) rotate(${rotation}deg) scale(0.3);
            opacity: 0;
          }
          10% {
            opacity: ${Math.random() * 0.6 + 0.4};
            transform: translateY(-5px) translateX(2px) rotate(${rotation + 20}deg) scale(1);
          }
          90% {
            opacity: ${Math.random() * 0.6 + 0.2};
            transform: translateY(${endTop - startPos.top}vh) translateX(${endLeft - startPos.left}vw) rotate(${rotation + 360}deg) scale(1.1);
          }
          100% {
            transform: translateY(${endTop - startPos.top}vh) translateX(${endLeft - startPos.left}vw) rotate(${rotation + 380}deg) scale(0.8);
            opacity: 0;
          }
        }
      `;
      
      newBubbles.push(
        <div key={`soap-bubble-${Date.now()}-${i}`}>
          <style>{keyframes}</style>
          <div style={bubbleStyle} />
        </div>
      );
    }
    
    setBubbleElements(prevBubbles => {
      const filtered = prevBubbles.slice(-10);
      return [...filtered, ...newBubbles];
    });
  };

  // Common effect styles - FIXED: position fixed and z-index to stay behind content
  const effectStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
    zIndex: -1, // IMPORTANT: Keep behind all content
    overflow: 'hidden' as const
  };
  
  // Effect-specific rendering
  switch (profile.visualEffect) {
    case 'bubbles':
      return (
        <div style={{...effectStyles, zIndex: -1}}>
          {bubbleElements}
        </div>
      );
      
    case 'aurora':
      return (
        <div style={effectStyles}>
          <div 
            style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: `
                linear-gradient(${auroraPhase}deg, 
                  transparent 0%, 
                  ${applyOpacity(color, opacity*0.3)} 20%, 
                  transparent 40%,
                  ${applyOpacity(color, opacity*0.4)} 60%,
                  transparent 80%,
                  ${applyOpacity(color, opacity*0.2)} 100%
                )
              `,
              animation: `auroraFlow ${15/speed}s ease-in-out infinite alternate`,
              transform: `rotate(${auroraPhase * 0.1}deg)`
            }} 
          />
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `
                linear-gradient(${auroraPhase + 90}deg, 
                  transparent 0%, 
                  ${applyOpacity(color, opacity*0.2)} 30%, 
                  transparent 70%
                )
              `,
              animation: `auroraFlow ${20/speed}s ease-in-out infinite alternate-reverse`,
              transform: `rotate(${-auroraPhase * 0.05}deg)`
            }} 
          />
        </div>
      );
      
    case 'nightsky':
      return (
        <div style={effectStyles}>
          {generateStars(200)}
          <div 
            style={{
              position: 'absolute',
              top: '10%',
              right: '20%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,220,${opacity*0.8}) 0%, rgba(200,200,255,${opacity*0.5}) 70%, transparent 100%)`,
              boxShadow: `0 0 60px rgba(255,255,220,${opacity*0.4})`,
              animation: `moonPulse ${6/speed}s ease-in-out infinite`
            }} 
          />
          {generateShootingStars(3)}
        </div>
      );
      
    case 'rainlightning':
      return (
        <div style={effectStyles}>
          {generateRain(60)}
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'transparent',
              animation: `lightning ${8/speed}s infinite`
            }} 
          />
        </div>
      );
      
    case 'galaxy':
      return (
        <div style={effectStyles}>
          {generateStars(300)}
          {generateNebula()}
          {generatePlanets()}
        </div>
      );
      
    case 'prism':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(${angle}deg, 
                transparent 0%,
                ${applyOpacity('#ff0096', opacity*0.3)} 16%,
                ${applyOpacity('#00ffff', opacity*0.3)} 33%,
                ${applyOpacity('#ffff00', opacity*0.3)} 50%,
                ${applyOpacity('#9600ff', opacity*0.3)} 66%,
                ${applyOpacity('#ff6400', opacity*0.3)} 83%,
                transparent 100%
              )
            `,
            animation: `prismShift ${8/speed}s ease-in-out infinite`,
            filter: 'blur(0.5px)'
          }} 
        />
      );
      
    case 'binary':
      return (
        <div style={effectStyles}>
          {generateBinaryMatrix(50)}
        </div>
      );
      
    case 'vhs':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              repeating-linear-gradient(
                0deg,
                rgba(0,0,0,${opacity*0.1}) 0px,
                rgba(0,0,0,${opacity*0.05}) 1px,
                transparent 3px
              )
            `,
            animation: `vhsGlitch ${2/speed}s infinite linear`
          }} 
        >
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, rgba(255,0,0,${opacity*0.02}), rgba(0,255,0,${opacity*0.02}), rgba(0,0,255,${opacity*0.02}))`,
              backgroundSize: '3px 100%',
              animation: `vhsNoise ${0.5/speed}s infinite linear`
            }}
          />
        </div>
      );
      
    case 'fairydust':
      return (
        <div style={effectStyles}>
          {generateFairyDust(25)}
        </div>
      );
      
    case 'texture3d':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              radial-gradient(ellipse 200% 100% at 50% 0%, ${rgba} 0%, transparent 50%),
              radial-gradient(ellipse 200% 100% at 0% 100%, ${applyOpacity(color, opacity*0.3)} 0%, transparent 50%),
              radial-gradient(ellipse 200% 100% at 100% 100%, ${applyOpacity(color, opacity*0.4)} 0%, transparent 50%)
            `,
            animation: `fabricWave ${12/speed}s ease-in-out infinite alternate`
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
                ${applyOpacity(color, opacity*0.7)} 120deg, 
                transparent 180deg,
                ${rgba} 240deg,
                transparent 300deg
              )
            `,
            animation: `kaleidoscopeRotation ${10/speed}s linear infinite`,
            transformOrigin: 'center'
          }} 
        />
      );
      
    case 'emojirain':
      return (
        <div style={effectStyles}>
          {generateEmojiRain(15)}
        </div>
      );
      
    case 'photomosaic':
      return (
        <div style={effectStyles}>
          {generatePhotoMosaic()}
        </div>
      );
      
    case 'shootingstars':
      return (
        <div style={effectStyles}>
          {generateShootingStars(6)}
        </div>
      );
      
    case 'smoke':
      return (
        <div style={effectStyles}>
          {generateSmoke()}
        </div>
      );
      
    case 'fireworks':
      return (
        <div style={effectStyles}>
          {generateFireworks(4)}
        </div>
      );
      
    case 'spark':
      return (
        <div style={{...effectStyles, zIndex: -1}}>
          {generateStaticSparks()}
        </div>
      );
      
    case 'ocean':
      return (
        <div style={effectStyles}>
          {generateOceanWaves()}
        </div>
      );
      
    case 'fire':
      return (
        <div style={effectStyles}>
          {generateFire()}
        </div>
      );
      
    default:
      return null;
  }
  
  // Helper functions for effects
  function generateStaticSparks() {
    const sparks = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      const sparkSize = Math.random() * 6 * size + 2;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 3;
      
      sparks.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${sparkSize}px`,
            height: `${sparkSize}px`,
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkSize*3}px ${color}`,
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
  
  function generateOceanWaves() {
    const waves = [];
    
    for (let i = 0; i < 4; i++) {
      waves.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: `${i * 20}px`,
            left: '-50%',
            width: '200%',
            height: `${60 + i * 20}px`,
            background: `linear-gradient(to top, ${rgba} 0%, transparent 100%)`,
            borderRadius: '50% 50% 0 0',
            animation: `oceanWaves ${8 + i * 2/speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: opacity * (0.8 - i * 0.1)
          }} 
        />
      );
    }
    
    return waves;
  }
  
  function generateFire() {
    const flames = [];
    
    for (let i = 0; i < 8; i++) {
      flames.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: '0',
            left: `${10 + i * 10}%`,
            width: `${20 + Math.random() * 30}px`,
            height: `${80 + Math.random() * 60}px`,
            background: `linear-gradient(to top, ${rgba} 0%, ${applyOpacity(color, opacity*0.3)} 60%, transparent 100%)`,
            borderRadius: '50% 50% 20% 20%',
            animation: `fireFlicker ${1 + Math.random()/speed}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 0.5}s`,
            filter: 'blur(1px)'
          }} 
        />
      );
    }
    
    return flames;
  }
  
  function generateSmoke() {
    const smokeClouds = [];
    
    for (let i = 0; i < 6; i++) {
      smokeClouds.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: `${Math.random() * 20}%`,
            left: `${Math.random() * 80 + 10}%`,
            width: `${60 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 60}px`,
            background: `radial-gradient(ellipse, ${rgba} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: `smokeFlow ${8 + Math.random() * 4/speed}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`,
            filter: 'blur(2px)'
          }} 
        />
      );
    }
    
    return smokeClouds;
  }
  
  // ... keep existing code (helper functions for other effects)
  
  function generateNebula() {
    const nebulas = [];
    for (let i = 0; i < 3; i++) {
      nebulas.push(
        <div 
          key={`nebula-${i}`}
          style={{
            position: 'absolute',
            width: `${200 + Math.random() * 300}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            background: `radial-gradient(ellipse, ${applyOpacity(color, opacity*0.3)} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: `nebulaDrift ${15/speed + Math.random() * 10}s ease-in-out infinite alternate`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    return nebulas;
  }
  
  function generatePlanets() {
    const planets = [];
    for (let i = 0; i < 2; i++) {
      planets.push(
        <div 
          key={`planet-${i}`}
          style={{
            position: 'absolute',
            width: `${40 + Math.random() * 60}px`,
            height: `${40 + Math.random() * 60}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            background: `radial-gradient(circle at 30% 30%, ${applyOpacity(color, opacity*0.8)} 0%, ${applyOpacity(color, opacity*0.4)} 100%)`,
            borderRadius: '50%',
            animation: `planetRotation ${20 + Math.random() * 10/speed}s linear infinite`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    return planets;
  }
  
  function generateBinaryMatrix(count: number) {
    const codes = [];
    const binaryChars = ['0', '1', '01', '10', '101', '010'];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      const duration = (Math.random() * 4 + 3) / speed;
      const char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      
      codes.push(
        <div 
          key={`binary-${i}`}
          style={{
            position: 'absolute',
            left,
            top: '-30px',
            color: rgba,
            fontFamily: 'monospace',
            fontSize: `${12 * size}px`,
            fontWeight: 'bold',
            animation: `binaryFall ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none',
            textShadow: `0 0 10px ${color}`
          }} 
        >
          {char}
        </div>
      );
    }
    
    return codes;
  }
  
  function generateEmojiRain(count: number) {
    const emojis = ['😂', '❤️', '🌈', '🔥', '✨', '🎉', '🚀', '💎', '🌟', '🎨'];
    const drops = [];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 4;
      const duration = (Math.random() * 4 + 3) / speed;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      drops.push(
        <div 
          key={`emoji-${i}`}
          style={{
            position: 'absolute',
            left,
            top: '-50px',
            fontSize: `${18 * size}px`,
            animation: `emojiDrop ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        >
          {emoji}
        </div>
      );
    }
    
    return drops;
  }
  
  function generateShootingStars(count: number) {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 6;
      const duration = (Math.random() * 2 + 1) / speed;
      const startLeft = Math.random() * 100;
      const startTop = Math.random() * 40;
      
      stars.push(
        <div 
          key={`shooting-star-${i}`}
          style={{
            position: 'absolute',
            left: `${startLeft}%`,
            top: `${startTop}%`,
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: `0 0 15px white, -80px 0 8px white, -150px 0 4px rgba(255,255,255,0.5)`,
            animation: `shootingStar ${duration}s ease-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return stars;
  }
  
  function generateFireworks(count: number) {
    const fireworks = [];
    
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 5;
      const left = Math.random() * 100;
      const top = 20 + Math.random() * 40;
      
      fireworks.push(
        <div 
          key={`firework-${i}`}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: '8px',
            height: '8px',
            background: color,
            borderRadius: '50%',
            animation: `fireworkExplode ${3/speed}s ease-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return fireworks;
  }
  
  function generateStars(count: number) {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      const starSize = Math.random() * 2 + 1;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 4;
      
      stars.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: `0 0 ${starSize*2}px rgba(255,255,255,${opacity*0.8})`,
            top,
            left,
            animation: `twinkle ${4/speed}s ease-in-out infinite`,
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
      const duration = (Math.random() * 1 + 0.8) / speed;
      
      drops.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: '1px',
            height: '15px',
            background: `linear-gradient(to bottom, transparent, ${applyOpacity('#87CEEB', opacity*0.7)})`,
            left,
            top: '-15px',
            animation: `rainDrop ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return drops;
  }
  
  function generateFairyDust(count: number) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particleSize = Math.random() * 3 + 2;
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
            animation: `fairyFloat ${5/speed}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return particles;
  }
  
  function generatePhotoMosaic() {
    // Placeholder for photo mosaic - would need actual photo data
    const blocks = [];
    
    for (let i = 0; i < 12; i++) {
      const left = (i % 4) * 25;
      const top = Math.floor(i / 4) * 33;
      
      blocks.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: '25%',
            height: '33%',
            background: `linear-gradient(45deg, ${rgba} 0%, ${applyOpacity(color, opacity*0.3)} 100%)`,
            animation: `mosaicFade ${6/speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return blocks;
  }
};

export default VisualEffect;
