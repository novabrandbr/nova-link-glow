
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
  const effectStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
    zIndex: -1,
    overflow: 'hidden' as const
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
    @keyframes prismShift {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes vhsGlitch {
      0%, 100% { transform: translateX(0); }
      10% { transform: translateX(-2px); }
      20% { transform: translateX(2px); }
      30% { transform: translateX(-1px); }
      40% { transform: translateX(1px); }
      50% { transform: translateX(0); }
    }
    @keyframes vhsNoise {
      0% { opacity: 0.8; }
      50% { opacity: 0.6; }
      100% { opacity: 0.8; }
    }
    @keyframes kaleidoscopeRotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes rainDrop {
      0% { transform: translateY(-20px); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    @keyframes binaryFall {
      0% { transform: translateY(-20px); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    @keyframes emojiDrop {
      0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes shootingStar {
      0% { transform: translateX(0) translateY(0); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
    }
    @keyframes fireworkExplode {
      0% { transform: scale(0.1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.8; }
      100% { transform: scale(2); opacity: 0; }
    }
    @keyframes fairyFloat {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-10px) translateX(5px); }
      50% { transform: translateY(-5px) translateX(-3px); }
      75% { transform: translateY(-8px) translateX(7px); }
    }
    @keyframes oceanWaves {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes fireFlicker {
      0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.8; }
      50% { transform: scaleY(1.3) scaleX(0.8); opacity: 1; }
    }
    @keyframes smokeFlow {
      0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; }
      50% { transform: translateY(-30px) translateX(10px) rotate(5deg); opacity: 0.8; }
      100% { transform: translateY(-60px) translateX(-5px) rotate(-3deg); opacity: 0.4; }
    }
    @keyframes nebulaDrift {
      0%, 100% { transform: translateX(0px) rotate(0deg); }
      50% { transform: translateX(20px) rotate(5deg); }
    }
    @keyframes planetRotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes glitchShift {
      0%, 100% { transform: translateX(0) skew(0deg); filter: hue-rotate(0deg); }
      10% { transform: translateX(-2px) skew(1deg); filter: hue-rotate(90deg); }
      20% { transform: translateX(2px) skew(-1deg); filter: hue-rotate(180deg); }
      30% { transform: translateX(-1px) skew(0.5deg); filter: hue-rotate(270deg); }
      40% { transform: translateX(1px) skew(-0.5deg); filter: hue-rotate(360deg); }
      50% { transform: translateX(0) skew(0deg); }
    }
    @keyframes lightLeak {
      0% { transform: translateX(-100%) rotate(-5deg); opacity: 0; }
      50% { opacity: 0.8; }
      100% { transform: translateX(100vw) rotate(5deg); opacity: 0; }
    }
    @keyframes vignetteBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes sparkFloat {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
      50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
    }
    @keyframes texture3DRotate {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
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
        animation: `soapBubbleFloat${Date.now()}-${i} ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        zIndex: -1,
        pointerEvents: 'none',
      };
      
      const keyframes = `
        @keyframes soapBubbleFloat${Date.now()}-${i} {
          0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; transform: scale(1) rotate(10deg); }
          90% { opacity: 0.6; transform: translateY(${endTop - startPos.top}vh) translateX(${endLeft - startPos.left}vw) scale(1.1) rotate(360deg); }
          100% { transform: translateY(${endTop - startPos.top}vh) translateX(${endLeft - startPos.left}vw) scale(0.8) rotate(380deg); opacity: 0; }
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
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  ${applyOpacity(color, opacity*0.05)} 1px,
                  transparent 3px
                )
              `,
              animation: `glitchShift ${2/speed}s infinite`,
              mixBlendMode: 'multiply'
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
              animation: `lightLeak ${8/speed}s ease-in-out infinite`,
              filter: 'blur(20px)'
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
              animation: `vignetteBreath ${4/speed}s ease-in-out infinite`
            }} 
          />
        </div>
      );
      
    case 'spark':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateSparkParticles(20)}
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
              transform: `rotate(${auroraPhase * 0.1}deg)`
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
                animation: `moonPulse ${6/speed}s ease-in-out infinite`
              }} 
            />
            {generateShootingStars(3)}
          </div>
        </div>
      );
      
    case 'rainlightning':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'linear-gradient(to bottom, #2c3e50 0%, #34495e 100%)'}}>
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
        </div>
      );
      
    case 'galaxy':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f0f23 100%)'}}>
            {generateStars(300)}
            {generateNebula()}
            {generatePlanets()}
          </div>
        </div>
      );
      
    case 'prism':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              ...effectStyles,
              background: `
                linear-gradient(45deg, 
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
        </div>
      );
      
    case 'binary':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'linear-gradient(to bottom, #000000 0%, #001a00 100%)'}}>
            {generateBinaryMatrix(50)}
          </div>
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
        </div>
      );
      
    case 'fairydust':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateFairyDust(25)}
        </div>
      );
      
    case 'texture3d':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              ...effectStyles,
              background: `
                linear-gradient(45deg, ${rgba} 25%, transparent 25%),
                linear-gradient(-45deg, ${rgba} 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, ${rgba} 75%),
                linear-gradient(-45deg, transparent 75%, ${rgba} 75%)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
              animation: `texture3DRotate ${10/speed}s linear infinite`,
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }} 
          />
        </div>
      );
      
    case 'ocean':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateOceanWaves()}
        </div>
      );
      
    case 'fire':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateFire()}
        </div>
      );
      
    case 'smoke':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateSmoke()}
        </div>
      );
      
    case 'fireworks':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)'}}>
            {generateFireworks(4)}
          </div>
        </div>
      );
      
    case 'shootingstars':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div style={{...effectStyles, background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)'}}>
            {generateShootingStars(6)}
          </div>
        </div>
      );
      
    case 'kaleidoscope':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          <div 
            style={{
              ...effectStyles,
              background: `
                conic-gradient(from 0deg, 
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
        </div>
      );
      
    case 'emojirain':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generateEmojiRain(15)}
        </div>
      );
      
    case 'photomosaic':
      return (
        <div style={effectStyles}>
          <style>{globalKeyframes}</style>
          {generatePhotoMosaic(20)}
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
                  opacity: opacity
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
                  opacity: opacity
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
  function generateSparkParticles(count: number) {
    const sparks = [];
    
    for (let i = 0; i < count; i++) {
      const sparkSize = Math.random() * 4 * size + 2;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 4;
      
      sparks.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            width: `${sparkSize}px`,
            height: `${sparkSize}px`,
            background: rgba,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkSize*3}px ${color}`,
            top,
            left,
            animation: `sparkFloat ${3/speed}s ease-in-out infinite`,
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
            opacity: opacity * (0.9 - i * 0.1)
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
            filter: 'blur(1px)'
          }} 
        />
      );
    }
    
    return flames;
  }
  
  function generateSmoke() {
    const smokeClouds = [];
    
    for (let i = 0; i < 8; i++) {
      smokeClouds.push(
        <div 
          key={i}
          style={{
            position: 'absolute',
            bottom: `${Math.random() * 30}%`,
            left: `${Math.random() * 70 + 15}%`,
            width: `${50 + Math.random() * 70}px`,
            height: `${35 + Math.random() * 50}px`,
            background: `radial-gradient(ellipse, ${rgba} 0%, transparent 70%)`,
            borderRadius: '50%',
            animation: `smokeFlow ${6 + Math.random() * 3/speed}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 3}s`,
            filter: 'blur(2px)'
          }} 
        />
      );
    }
    
    return smokeClouds;
  }

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
  
  function generatePhotoMosaic(count: number) {
    const photos = [];
    
    for (let i = 0; i < count; i++) {
      const photoSize = Math.random() * 40 * size + 30;
      const left = `${Math.random() * 90}%`;
      const top = `${Math.random() * 90}%`;
      const delay = Math.random() * 4;
      
      photos.push(
        <div 
          key={`photo-${i}`}
          style={{
            position: 'absolute',
            width: `${photoSize}px`,
            height: `${photoSize}px`,
            left,
            top,
            background: `linear-gradient(45deg, ${rgba} 0%, ${applyOpacity(color, opacity*0.6)} 100%)`,
            borderRadius: '4px',
            animation: `fairyFloat ${4/speed}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            pointerEvents: 'none',
            opacity: opacity * 0.7
          }} 
        />
      );
    }
    
    return photos;
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
};

export default VisualEffect;
