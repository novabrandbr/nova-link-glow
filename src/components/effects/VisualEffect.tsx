
import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';

interface VisualEffectProps {
  profile: UserProfile;
}

const VisualEffect: React.FC<VisualEffectProps> = ({ profile }) => {
  const [bubbleElements, setBubbleElements] = useState<React.ReactNode[]>([]);
  const [auroraPhase, setAuroraPhase] = useState(0);
  const [glitchPhase, setGlitchPhase] = useState(0);
  
  useEffect(() => {
    let bubbleInterval: NodeJS.Timeout;
    let auroraInterval: NodeJS.Timeout;
    let glitchInterval: NodeJS.Timeout;
    
    // Aurora effect animation
    if (profile.visualEffect === 'aurora') {
      auroraInterval = setInterval(() => {
        setAuroraPhase(prev => (prev + 1) % 360);
      }, 100);
    }
    
    // Glitch effect animation
    if (profile.visualEffect === 'glitch') {
      glitchInterval = setInterval(() => {
        setGlitchPhase(prev => (prev + 1) % 100);
      }, 50);
    }
    
    // Soap bubbles generation
    if (profile.visualEffect === 'bubbles') {
      generateSoapBubbles();
      bubbleInterval = setInterval(generateSoapBubbles, 3000);
    }
    
    return () => {
      if (bubbleInterval) clearInterval(bubbleInterval);
      if (auroraInterval) clearInterval(auroraInterval);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, [profile.visualEffect, profile.visualEffectSpeed]);
  
  if (profile.visualEffect === 'none') return null;
  
  // Default values with fallbacks
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
  
  // Common effect styles - positioned as background layer
  const effectStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  };

  // Global keyframes for all effects
  const globalKeyframes = `
    @keyframes auroraFlow {
      0%, 100% { transform: translateX(-20%) translateY(-10%) rotate(0deg); }
      50% { transform: translateX(20%) translateY(10%) rotate(10deg); }
    }
    @keyframes moonPulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    @keyframes lightning {
      0%, 90%, 100% { background: transparent; }
      92%, 94%, 96% { background: rgba(255,255,255,0.3); }
    }
    @keyframes vhsGlitch {
      0%, 100% { transform: translateX(0); }
      10% { transform: translateX(-1px); }
      20% { transform: translateX(1px); }
      30% { transform: translateX(0); }
    }
    @keyframes glitchShift {
      0%, 100% { transform: translateX(0); filter: hue-rotate(0deg); }
      10% { transform: translateX(-1px); filter: hue-rotate(90deg); }
      20% { transform: translateX(1px); filter: hue-rotate(180deg); }
      30% { transform: translateX(0); filter: hue-rotate(270deg); }
    }
    @keyframes lightLeak {
      0% { transform: translateX(-100%) rotate(-5deg); opacity: 0; }
      20% { opacity: ${opacity}; }
      80% { opacity: ${opacity}; }
      100% { transform: translateX(100vw) rotate(5deg); opacity: 0; }
    }
    @keyframes lightLeakPause {
      0%, 20% { opacity: 0; transform: translateX(-100%) rotate(-5deg); }
      25%, 75% { opacity: ${opacity}; transform: translateX(0) rotate(0deg); }
      80%, 100% { opacity: 0; transform: translateX(100vw) rotate(5deg); }
    }
    @keyframes vignetteBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes fireFlicker {
      0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.8; }
      50% { transform: scaleY(1.3) scaleX(0.8); opacity: 1; }
    }
    @keyframes oceanWaves {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes bubbleFloat {
      0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
      10% { opacity: 0.8; transform: scale(1) rotate(10deg); }
      90% { opacity: 0.6; transform: translateY(-100vh) translateX(20vw) scale(1.1) rotate(360deg); }
      100% { transform: translateY(-100vh) translateX(20vw) scale(0.8) rotate(380deg); opacity: 0; }
    }
  `;

  // Generate soap bubbles from random angles
  const generateSoapBubbles = () => {
    const count = Math.floor(Math.random() * 3) + 2;
    const newBubbles = [];
    
    for (let i = 0; i < count; i++) {
      const bubbleSize = Math.random() * 60 * size + 40;
      
      const startPositions = [
        { side: 'bottom-left', left: -10, top: 110, direction: 'diagonal-up-right' },
        { side: 'bottom-right', left: 110, top: 110, direction: 'diagonal-up-left' },
        { side: 'left', left: -15, top: Math.random() * 80 + 10, direction: 'right' },
        { side: 'right', left: 115, top: Math.random() * 80 + 10, direction: 'left' },
        { side: 'bottom', left: Math.random() * 80 + 10, top: 110, direction: 'up' },
      ];
      
      const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
      const duration = (Math.random() * 6 + 8) / speed;
      const delay = Math.random() * 4;
      
      let endLeft = startPos.left;
      let endTop = startPos.top;
      
      switch (startPos.direction) {
        case 'up':
          endTop = -20;
          endLeft += (Math.random() - 0.5) * 60;
          break;
        case 'right':
          endLeft = 120;
          endTop += (Math.random() - 0.5) * 60;
          break;
        case 'left':
          endLeft = -20;
          endTop += (Math.random() - 0.5) * 60;
          break;
        case 'diagonal-up-right':
          endLeft = 120;
          endTop = -20;
          break;
        case 'diagonal-up-left':
          endLeft = -20;
          endTop = -20;
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
          radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.8), transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.4), transparent 40%),
          radial-gradient(circle, transparent 65%, ${rgba} 75%, transparent 85%)
        `,
        border: `3px solid ${rgba}`,
        boxShadow: `
          0 0 ${bubbleSize/2}px ${applyOpacity(color, opacity * 0.6)},
          inset -${bubbleSize/4}px -${bubbleSize/4}px ${bubbleSize/3}px rgba(255,255,255,0.7),
          inset ${bubbleSize/6}px ${bubbleSize/6}px ${bubbleSize/4}px rgba(255,255,255,0.4)
        `,
        opacity: 0,
        animation: `bubbleFloat ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        zIndex: 0,
        pointerEvents: 'none',
      };
      
      newBubbles.push(
        <div key={`soap-bubble-${Date.now()}-${i}`} style={bubbleStyle} />
      );
    }
    
    setBubbleElements(prevBubbles => {
      const filtered = prevBubbles.slice(-8);
      return [...filtered, ...newBubbles];
    });
  };
  
  // Effect-specific rendering
  switch (profile.visualEffect) {
    case 'bubbles':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {bubbleElements}
        </div>
      );
      
    case 'glitch':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  ${applyOpacity(color, opacity*0.1)} 2px,
                  transparent 4px
                )
              `,
              animation: `glitchShift ${2/speed}s infinite`,
              pointerEvents: 'none'
            }} 
          />
        </div>
      );
      
    case 'lightleak':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              position: 'absolute',
              width: '200%',
              height: '120%',
              top: '-10%',
              left: '-50%',
              background: `linear-gradient(45deg, transparent 40%, ${rgba} 50%, transparent 60%)`,
              animation: `lightLeakPause ${12/speed}s ease-in-out infinite`,
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }} 
          />
        </div>
      );
      
    case 'vignette':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `radial-gradient(ellipse at center, transparent 40%, ${rgba} 100%)`,
              animation: `vignetteBreath ${4/speed}s ease-in-out infinite`,
              pointerEvents: 'none'
            }} 
          />
        </div>
      );
      
    case 'aurora':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
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
              transform: `rotate(${auroraPhase * 0.1}deg)`,
              pointerEvents: 'none'
            }} 
          />
        </div>
      );
      
    case 'nightsky':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)'}}>
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
                animation: `moonPulse ${6/speed}s ease-in-out infinite`,
                pointerEvents: 'none'
              }} 
            />
          </div>
        </div>
      );
      
    case 'fire':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateFire()}
        </div>
      );
      
    case 'ocean':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateOceanWaves()}
        </div>
      );
      
    case 'vhs':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
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
              animation: `vhsGlitch ${2/speed}s infinite linear`,
              pointerEvents: 'none'
            }} 
          />
        </div>
      );
      
    case 'custom':
      if (profile.visualEffectCustomUrl) {
        return (
          <div style={effectStyles}>
            {profile.visualEffectCustomUrl.startsWith('data:image') ? (
              <img 
                src={profile.visualEffectCustomUrl} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: opacity,
                  pointerEvents: 'none'
                }}
                alt="Custom effect" 
              />
            ) : (
              <video 
                src={profile.visualEffectCustomUrl} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: opacity,
                  pointerEvents: 'none'
                }}
                autoPlay 
                muted 
                loop 
              />
            )}
          </div>
        );
      }
      return null;
      
    default:
      return null;
  }
  
  // Helper functions for effects
  function generateOceanWaves() {
    const waves = [];
    
    for (let i = 0; i < 5; i++) {
      waves.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: `${i * 15}px`,
            left: '-50%',
            width: '200%',
            height: `${50 + i * 15}px`,
            background: `linear-gradient(to top, ${rgba} 0%, transparent 100%)`,
            borderRadius: '50% 50% 0 0',
            animation: `oceanWaves ${6 + i * 1.5/speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            opacity: opacity * (0.9 - i * 0.1),
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return waves;
  }
  
  function generateFire() {
    const flames = [];
    
    for (let i = 0; i < 12; i++) {
      flames.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: '0',
            left: `${5 + i * 7.5}%`,
            width: `${15 + Math.random() * 25}px`,
            height: `${60 + Math.random() * 50}px`,
            background: `linear-gradient(to top, ${rgba} 0%, ${applyOpacity(color, opacity*0.6)} 40%, ${applyOpacity(color, opacity*0.2)} 80%, transparent 100%)`,
            borderRadius: '50% 50% 30% 30%',
            animation: `fireFlicker ${0.8 + Math.random() * 0.4/speed}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 0.5}s`,
            filter: 'blur(1px)',
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return flames;
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
            animationDelay: `${delay}s`,
            pointerEvents: 'none'
          }} 
        />
      );
    }
    
    return stars;
  }
};

export default VisualEffect;
