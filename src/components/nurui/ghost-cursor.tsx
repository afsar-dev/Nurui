"use client";
import React, { useRef, useEffect } from "react";

const GhostTrailCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Define a Particle type to avoid using 'any'
  type ParticleType = {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    color: string;
    draw: () => void;
    update: () => void;
  };

  useEffect(() => {
    // Move particles array inside useEffect to avoid dependency warning
    const particles: ParticleType[] = [];

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 6 + 2;
        this.alpha = 1;
        this.color = "255, 255, 255";
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.alpha -= 0.02;
      }
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e: MouseEvent) => {
      particles.push(new Particle(e.clientX, e.clientY));
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default GhostTrailCursor;
