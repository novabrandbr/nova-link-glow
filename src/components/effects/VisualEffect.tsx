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
    
    // Generate soap bubbles randomly from different angles
    if (profile.visualEffect === 'bubbles') {
      generateSoapBubbles();
      bubbleInterval = setInterval(generateSoapBubbles, 1500);
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
  
  // Generate realistic soap bubbles from random angles
  const generateSoapBubbles = () => {
    const count = Math.floor(Math.random() * 8) + 3; // 3-10 bubbles
    const newBubbles = [];
    
    for (let i = 0; i < count; i++) {
      const bubbleSize = Math.random() * 60 * size + 20;
      const startPositions = [
        { side: 'bottom', left: Math.random() * 100, top: 110 },
        { side: 'left', left: -10, top: Math.random() * 100 },
        { side: 'right', left: 110, top: Math.random() * 100 },
        { side: 'bottom-left', left: Math.random() * 30, top: 110 },
        { side: 'bottom-right', left: 70 + Math.random() * 30, top: 110 }
      ];
      
      const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
      const horizontalDrift = (Math.random() - 0.5) * 80;
      const delay = Math.random() * 2;
      const duration = (Math.random() * 8 + 6) / speed;
      const rotation = Math.random() * 360;
      
      const bubbleStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: '50%',
        left: `${startPos.left}%`,
        top: `${startPos.top}%`,
        background: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9), transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3), transparent 30%),
          radial-gradient(circle, ${rgba} 0%, transparent 70%)
        `,
        border: `1px solid ${rgba}`,
        boxShadow: `
          0 0 ${bubbleSize/2}px ${applyOpacity(color, opacity * 0.3)},
          inset -${bubbleSize/4}px -${bubbleSize/4}px ${bubbleSize/3}px rgba(255,255,255,0.4),
          inset ${bubbleSize/6}px ${bubbleSize/6}px ${bubbleSize/4}px rgba(255,255,255,0.2)
        `,
        opacity: Math.random() * 0.7 + 0.3,
        animation: `soapBubbleFloat${i} ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        zIndex: 5,
        pointerEvents: 'none',
        transform: `rotate(${rotation}deg)`
      };
      
      const endLeft = startPos.left + horizontalDrift;
      const endTop = startPos.side.includes('bottom') ? -20 : 
                     startPos.side === 'left' ? Math.random() * 40 : 
                     startPos.side === 'right' ? 60 + Math.random() * 40 : -20;
      
      const keyframes = `
        @keyframes soapBubbleFloat${i} {
          0% {
            transform: translateY(0) translateX(0) rotate(${rotation}deg) scale(0.8);
            opacity: 0;
          }
          5% {
            opacity: ${Math.random() * 0.7 + 0.3};
            transform: translateY(-10px) translateX(0) rotate(${rotation + 10}deg) scale(1);
          }
          100% {
            transform: translateY(${endTop - startPos.top}vh) translateX(${endLeft - startPos.left}vw) rotate(${rotation + 180}deg) scale(1.2);
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
      const filtered = prevBubbles.slice(-15);
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
        <div style={{...effectStyles, zIndex: 1}}>
          {bubbleElements}
        </div>
      );
      
    case 'aurora':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(${angle}deg, 
                rgba(0,255,150,${opacity*0.4}) 0%, 
                rgba(100,0,255,${opacity*0.5}) 30%, 
                rgba(0,200,255,${opacity*0.4}) 60%, 
                rgba(255,100,200,${opacity*0.3}) 100%
              )
            `,
            animation: `auroraFlow ${12/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'nightsky':
      return (
        <div style={effectStyles}>
          {generateStars(150)}
          <div 
            style={{
              position: 'absolute',
              top: '15%',
              right: '25%',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,220,${opacity}) 0%, rgba(200,200,255,${opacity*0.7}) 70%, transparent 100%)`,
              boxShadow: `0 0 80px rgba(255,255,220,${opacity*0.6})`,
              animation: `twinkle ${4/speed}s ease-in-out infinite`
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
              radial-gradient(ellipse at center, ${rgba} 0%, transparent 60%),
              radial-gradient(ellipse at 25% 75%, rgba(255,100,200,${opacity*0.5}) 0%, transparent 50%),
              radial-gradient(ellipse at 75% 25%, rgba(100,200,255,${opacity*0.5}) 0%, transparent 50%),
              conic-gradient(from 0deg, transparent, ${applyOpacity(color, opacity*0.3)}, transparent)
            `,
            animation: `galaxyRotation ${20/speed}s linear infinite`
          }} 
        >
          {generateStars(300)}
          {generateNebula()}
        </div>
      );
      
    case 'prism':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              linear-gradient(${angle}deg, 
                rgba(255,0,150,${opacity*0.4}) 0%,
                rgba(0,255,255,${opacity*0.4}) 16%,
                rgba(255,255,0,${opacity*0.4}) 33%,
                rgba(150,0,255,${opacity*0.4}) 50%,
                rgba(255,100,0,${opacity*0.4}) 66%,
                rgba(0,255,150,${opacity*0.4}) 83%,
                rgba(255,0,150,${opacity*0.4}) 100%
              )
            `,
            animation: `prismShift ${6/speed}s ease-in-out infinite alternate`,
            filter: 'blur(1px)'
          }} 
        />
      );
      
    case 'binary':
      return (
        <div style={effectStyles}>
          {generateBinaryMatrix(40)}
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
                rgba(0,0,0,${opacity*0.05}) 2px,
                transparent 4px
              ),
              linear-gradient(90deg, 
                rgba(255,0,0,${opacity*0.03}), 
                rgba(0,255,0,${opacity*0.03}), 
                rgba(0,0,255,${opacity*0.03})
              )
            `,
            backgroundSize: '100% 6px, 4px 100%',
            animation: `vhsNoise ${0.3/speed}s infinite linear`
          }} 
        />
      );
      
    case 'emojirain':
      return (
        <div style={effectStyles}>
          {generateEmojiRain(20)}
        </div>
      );
      
    case 'shootingstars':
      return (
        <div style={effectStyles}>
          {generateShootingStars(8)}
        </div>
      );
      
    case 'smoke':
      return (
        <div 
          style={{
            ...effectStyles,
            background: `
              radial-gradient(ellipse 60% 40% at 30% 70%, ${rgba} 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 70% 80%, ${applyOpacity(color, opacity*0.7)} 0%, transparent 60%),
              radial-gradient(ellipse 100% 80% at 50% 90%, ${applyOpacity(color, opacity*0.5)} 0%, transparent 70%)
            `,
            animation: `smokeFlow ${8/speed}s ease-in-out infinite alternate`
          }} 
        />
      );
      
    case 'fireworks':
      return (
        <div style={effectStyles}>
          {generateFireworks(6)}
        </div>
      );
      
    case 'spark':
      return (
        <div style={{...effectStyles, zIndex: -1}}>
          {generateSparks()}
        </div>
      );
      
    default:
      return null;
  }
  
  // Helper functions for new effects
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
  
  function generateBinaryMatrix(count: number) {
    const codes = [];
    const binaryChars = ['0', '1', '01', '10', '101', '010', '110', '001'];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 3;
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
            fontSize: `${14 * size}px`,
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
      const delay = Math.random() * 3;
      const duration = (Math.random() * 3 + 2) / speed;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      drops.push(
        <div 
          key={`emoji-${i}`}
          style={{
            position: 'absolute',
            left,
            top: '-50px',
            fontSize: `${20 * size}px`,
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
      const delay = Math.random() * 5;
      const duration = (Math.random() * 2 + 1) / speed;
      const startLeft = Math.random() * 100;
      const startTop = Math.random() * 50;
      
      stars.push(
        <div 
          key={`shooting-star-${i}`}
          style={{
            position: 'absolute',
            left: `${startLeft}%`,
            top: `${startTop}%`,
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: `0 0 20px white, -100px 0 10px white, -200px 0 5px rgba(255,255,255,0.5)`,
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
      const delay = Math.random() * 4;
      const left = Math.random() * 100;
      const top = 20 + Math.random() * 60;
      
      fireworks.push(
        <div 
          key={`firework-${i}`}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: '10px',
            height: '10px',
            background: color,
            borderRadius: '50%',
            animation: `fireworkExplode ${2/speed}s ease-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return fireworks;
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
