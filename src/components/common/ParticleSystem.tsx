import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'star' | 'spark' | 'glow' | 'trail';
  opacity: number;
  angle: number;
  spin: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  interactive?: boolean;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 80,
  colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
  speed = 0.5,
  size = 2,
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>(0);

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, 
        size: 0, color: '', type: 'star', opacity: 0, angle: 0, spin: 0
      };
    }

    const types: Particle['type'][] = ['star', 'spark', 'glow', 'trail'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      life: Math.random() * 300 + 100,
      maxLife: Math.random() * 300 + 100,
      size: Math.random() * size * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      type,
      opacity: Math.random() * 0.8 + 0.2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02
    };
  }, [colors, speed, size]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    const alpha = (particle.life / particle.maxLife) * particle.opacity;
    ctx.save();
    
    ctx.globalAlpha = alpha;
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.angle);

    switch (particle.type) {
      case 'star':
        // Draw star shape
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const outerRadius = particle.size;
          const innerRadius = particle.size * 0.4;
          
          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
          } else {
            ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
          }
          
          const innerAngle = angle + Math.PI / 5;
          ctx.lineTo(Math.cos(innerAngle) * innerRadius, Math.sin(innerAngle) * innerRadius);
        }
        ctx.closePath();
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = particle.color;
        ctx.fill();
        break;

      case 'spark':
        // Draw spark lines
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.5;
        ctx.lineCap = 'round';
        
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const length = particle.size * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
          ctx.stroke();
        }
        break;

      case 'glow': {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        break;
      }

      case 'trail':
        // Draw trailing particle
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add motion blur effect
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size * 3, particle.size * 0.5, 0, 0, Math.PI * 2);
        ctx.globalAlpha = alpha * 0.3;
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }, []);

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Update rotation
    particle.angle += particle.spin;
    
    // Update life
    particle.life -= 1;
    
    // Mouse interaction
    if (interactive && mouseRef.current.active) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.01;
        particle.vy -= Math.sin(angle) * force * 0.01;
      }
    }
    
    // Add slight gravitational drift
    particle.vy += 0.001;
    
    // Add friction
    particle.vx *= 0.999;
    particle.vy *= 0.999;
    
    // Boundary conditions with wrapping
    if (particle.x < -particle.size) {
      particle.x = canvas.width + particle.size;
    } else if (particle.x > canvas.width + particle.size) {
      particle.x = -particle.size;
    }
    
    if (particle.y < -particle.size) {
      particle.y = canvas.height + particle.size;
    } else if (particle.y > canvas.height + particle.size) {
      particle.y = -particle.size;
    }
    
    return particle.life > 0;
  }, [interactive]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const alive = updateParticle(particle, canvas);
      if (alive) {
        drawParticle(ctx, particle);
      }
      return alive;
    });
    
    // Add new particles to maintain count
    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push(createParticle());
    }
    
    // Add random burst particles occasionally
    if (Math.random() < 0.02) {
      const burstX = Math.random() * canvas.width;
      const burstY = Math.random() * canvas.height;
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push(createParticle(burstX, burstY));
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [particleCount, createParticle, updateParticle, drawParticle]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
    mouseRef.current.active = true;
    
    // Add particles at mouse position
    if (Math.random() < 0.3) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
    }
  }, [createParticle]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());
    
    // Start animation
    animate();
    
    // Add event listeners
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, createParticle, animate, interactive, handleMouseMove, handleMouseLeave, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default ParticleSystem;
