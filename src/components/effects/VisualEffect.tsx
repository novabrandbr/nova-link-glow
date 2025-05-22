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
    // For effects that need angle variation (light leak, glitch)
    const angleInterval = setInterval(() => {
      setAngle(prevAngle => (prevAngle + 90) % 360);
    }, 5000);
    
    // For effects that need to appear/disappear (glitch, light leak)
    const visibilityInterval = setInterval(() => {
      setShowEffect(prev => !prev);
    }, 3000);
    
    // Generate new bubble elements periodically
    if (profile.visualEffect === 'bubbles') {
      generateBubbles();
      const bubbleInterval = setInterval(generateBubbles, 2000);
      return () => {
        clearInterval(angleInterval);
        clearInterval(visibilityInterval);
        clearInterval(bubbleInterval);
      };
    }
    
    return () => {
      clearInterval(angleInterval);
      clearInterval(visibilityInterval);
    };
  }, [profile.visualEffect]);
  
  if (profile.visualEffect === 'none') return null;
  
  // Determine opacity and color with fallbacks
  const opacity = profile.visualEffectOpacity || 0.7;
  const color = profile.visualEffectColor || '#6A0DAD';
  const speed = profile.visualEffectSpeed || 1;
  const size = profile.visualEffectSize || 1;
  
  // Helper function to apply opacity to colors
  const applyOpacity = (hexColor: string, opacity: number) => {
    // Convert hex to rgb
    let r = 0, g = 0, b = 0;
    
    // 3 digits
    if (hexColor.length === 4) {
      r = parseInt(hexColor[1] + hexColor[1], 16);
      g = parseInt(hexColor[2] + hexColor[2], 16);
      b = parseInt(hexColor[3] + hexColor[3], 16);
    } 
    // 6 digits
    else if (hexColor.length === 7) {
      r = parseInt(hexColor.substring(1, 3), 16);
      g = parseInt(hexColor.substring(3, 5), 16);
      b = parseInt(hexColor.substring(5, 7), 16);
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  const rgba = applyOpacity(color, opacity);
  
  // Generate bubbles that look like soap bubbles
  const generateBubbles = () => {
    const count = 5; // Generate 5 new bubbles at a time
    const newBubbles = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 30 * (profile.visualEffectSize || 1) + 10;
      const left = `${Math.random() * 100}%`;
      const startPosition = `${80 + Math.random() * 20}%`; // Start from bottom area
      const horizontalMovement = Math.random() * 100 - 50; // Random horizontal drift
      
      const delay = Math.random() * 2;
      const duration = (Math.random() * 8 + 4) / speed;
      
      const bubbleStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        left,
        bottom: '0',
        border: `1px solid ${rgba}`,
        boxShadow: `0 0 10px ${rgba}, inset 0 0 10px ${rgba}`,
        opacity: Math.random() * 0.5 + 0.2,
        animation: `soapBubble ${duration}s ease-out forwards`,
        animationDelay: `${delay}s`,
        transform: 'translateY(0) translateX(0)',
        zIndex: 5,
      };
      
      const keyframes = `
        @keyframes soapBubble {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${Math.random() * 0.5 + 0.2};
          }
          100% {
            transform: translateY(-${startPosition}) translateX(${horizontalMovement}px);
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
      // Keep only bubbles that are still visible (less than their duration + delay)
      const filtered = prevBubbles.slice(-15); // Keep last 15 bubbles
      return [...filtered, ...newBubbles];
    });
  };
  
  // Style objects for different effects
  const effectStyles = {
    bubbles: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 10,
    },
    glitch: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `linear-gradient(${angle}deg, ${rgba} 2px, transparent 2px)`,
      backgroundSize: `${10 * size}px 100%`,
      pointerEvents: 'none',
      zIndex: 10,
      opacity: showEffect ? 0.7 : 0,
      transition: 'opacity 0.3s ease',
      animationDuration: `${8/speed}s`,
    },
    lightleak: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      background: `linear-gradient(${angle}deg, ${rgba} 0%, transparent 20%, transparent 80%, ${rgba} 100%)`,
      opacity: showEffect ? opacity : 0,
      transition: 'opacity 0.5s ease, background 1s ease',
      animationDuration: `${12/speed}s`,
    },
    spark: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    particles: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    snow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    confetti: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    matrix: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
      color: rgba,
      fontFamily: 'monospace',
    },
    flames: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: `${30 * size}%`,
      pointerEvents: 'none',
      zIndex: 10,
      backgroundImage: `linear-gradient(to top, ${rgba}, transparent)`,
      animationDuration: `${3/speed}s`,
    },
    stars: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    waves: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${rgba} 50%, transparent 60%, transparent 100%)
      `,
      backgroundSize: `${200 * size}% ${200 * size}%`,
      pointerEvents: 'none',
      zIndex: 10,
      animation: `waveMovement ${10/speed}s infinite alternate`,
      animationTimingFunction: 'ease-in-out',
    },
    smoke: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at center, ${rgba} 0%, transparent 50%), 
        radial-gradient(circle at 60% 40%, ${rgba} 0%, transparent 70%)
      `,
      backgroundSize: `${200 * size}% ${200 * size}%`,
      pointerEvents: 'none',
      zIndex: 10,
      animationDuration: `${10/speed}s`,
    },
    fireworks: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden',
    },
    vignette: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: `inset 0 0 ${50 * size}px ${30 * size}px rgba(0, 0, 0, ${opacity})`,
      pointerEvents: 'none',
      zIndex: 10,
    },
    oldscreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, ${opacity/2}) 50%),
        linear-gradient(90deg, rgba(255, 0, 0, ${opacity/10}), rgba(0, 255, 0, ${opacity/10}), rgba(0, 0, 255, ${opacity/10}))
      `,
      backgroundSize: `100% 2px, 3px 100%`,
      animation: `oldScreenNoise ${0.5/speed}s infinite linear`,
      pointerEvents: 'none',
      zIndex: 10,
      opacity: opacity,
    },
    custom: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
      backgroundImage: `url(${profile.visualEffectCustomUrl})`,
      backgroundSize: 'cover',
      opacity,
    },
  } as { [key: string]: React.CSSProperties };
  
  // Generate particles for various effects
  const generateParticles = (count: number, type: string) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 5;
      const duration = (Math.random() * 5 + 5) / speed;
      const size = Math.random() * 10 * (profile.visualEffectSize || 1) + 3;
      const left = `${Math.random() * 100}%`;
      
      let style: React.CSSProperties = {
        position: 'absolute',
        left,
        backgroundColor: rgba,
        opacity: 0,
        animation: `${type === 'bubbles' ? 'bubbles' : type === 'snow' ? 'snowfall' : type === 'confetti' ? 'confetti' : 'matrixDrop'} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        zIndex: 5,
      };
      
      if (type === 'snow') {
        style = {
          ...style,
          width: `${size/2}px`,
          height: `${size/2}px`,
          borderRadius: '50%',
          top: '-10px',
        };
      } else if (type === 'confetti') {
        const colors = [rgba, applyOpacity('#FF0000', opacity), applyOpacity('#00FF00', opacity), applyOpacity('#0000FF', opacity)];
        style = {
          ...style,
          width: `${size/2}px`,
          height: `${size}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          top: '-10px',
        };
      } else if (type === 'matrix') {
        style = {
          ...style,
          fontSize: `${size}px`,
          color: rgba,
          top: '-20px',
          fontFamily: 'monospace',
        };
      } else if (type === 'stars') {
        style = {
          ...style,
          width: `${size/2}px`,
          height: `${size/2}px`,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: `0 0 ${size/2}px ${size/4}px ${rgba}`,
          top: `${Math.random() * 100}%`,
          animation: 'twinkle 2s ease-in-out infinite',
          animationDelay: `${delay}s`,
        };
      } else if (type === 'fireworks') {
        style = {
          ...style,
          width: `${size*2}px`,
          height: `${size*2}px`,
          borderRadius: '50%',
          backgroundImage: `radial-gradient(circle, ${rgba} 0%, transparent 70%)`,
          top: `${30 + Math.random() * 40}%`,
          animation: 'firework 3s ease-out infinite',
          animationDelay: `${delay}s`,
        };
      }
      
      particles.push(<div key={i} style={style}>{type === 'matrix' ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : ''}</div>);
    }
    return particles;
  };
  
  // Generate spark particles
  const generateSparks = () => {
    const sparks = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 3;
      const size = Math.random() * 6 * (profile.visualEffectSize || 1) + 2;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      
      const style: React.CSSProperties = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: rgba,
        borderRadius: '50%',
        boxShadow: `0 0 ${size}px ${size/2}px ${rgba}`,
        top,
        left,
        opacity: 0,
        animation: `spark ${3/speed}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: 5,
      };
      
      sparks.push(<div key={i} style={style} />);
    }
    
    return sparks;
  };

  // Keyframes for waves animation
  const waveKeyframes = `
    @keyframes waveMovement {
      0% { background-position: 0% 0%; }
      25% { background-position: 100% 0%; }
      50% { background-position: 100% 100%; }
      75% { background-position: 0% 100%; }
      100% { background-position: 0% 0%; }
    }
  `;

  // Keyframes for old screen effect
  const oldScreenKeyframes = `
    @keyframes oldScreenNoise {
      0% { background-position: 0 0; }
      100% { background-position: 100% 100%; }
    }
  `;

  switch (profile.visualEffect) {
    case 'bubbles':
      return (
        <div style={effectStyles.bubbles}>
          {bubbleElements}
        </div>
      );
    case 'glitch':
      return <div style={effectStyles.glitch} />;
    case 'lightleak':
      return <div style={effectStyles.lightleak} />;
    case 'spark':
      return (
        <div style={effectStyles.spark}>
          {generateSparks()}
        </div>
      );
    case 'particles':
      return (
        <div style={effectStyles.particles}>
          {generateParticles(20, 'particles')}
        </div>
      );
    case 'snow':
      return (
        <div style={effectStyles.snow}>
          {generateParticles(50, 'snow')}
        </div>
      );
    case 'confetti':
      return (
        <div style={effectStyles.confetti}>
          {generateParticles(40, 'confetti')}
        </div>
      );
    case 'matrix':
      return (
        <div style={effectStyles.matrix}>
          {generateParticles(30, 'matrix')}
        </div>
      );
    case 'flames':
      return <div style={effectStyles.flames} className="animate-flames" />;
    case 'stars':
      return (
        <div style={effectStyles.stars}>
          {generateParticles(50, 'stars')}
        </div>
      );
    case 'waves':
      return (
        <>
          <style>{waveKeyframes}</style>
          <div style={effectStyles.waves} />
        </>
      );
    case 'smoke':
      return <div style={effectStyles.smoke} className="animate-smoke" />;
    case 'fireworks':
      return (
        <div style={effectStyles.fireworks}>
          {generateParticles(15, 'fireworks')}
        </div>
      );
    case 'vignette':
      return <div style={effectStyles.vignette} />;
    case 'oldscreen':
      return (
        <>
          <style>{oldScreenKeyframes}</style>
          <div style={effectStyles.oldscreen} />
        </>
      );
    case 'custom':
      return profile.visualEffectCustomUrl ? <div style={effectStyles.custom} /> : null;
    default:
      return null;
  }
};

export default VisualEffect;
