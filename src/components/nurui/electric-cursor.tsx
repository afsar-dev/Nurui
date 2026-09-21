"use client";
import React, { useEffect, useRef } from "react";

// Interface for Spark instance
interface ISpark {
  x: number;
  y: number;
  length: number;
  alpha: number;
  update: () => void;
  draw: () => void;
}

const ElectricCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const sparks: ISpark[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Spark implements ISpark {
      x: number;
      y: number;
      length: number;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.length = Math.random() * 10 + 5;
        this.alpha = 1;
      }

      update(): void {
        this.length -= 0.5;
        this.alpha -= 0.03;
      }

      draw(): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.random() * this.length,
          this.y + Math.random() * this.length,
        );
        ctx.strokeStyle = `rgba(0, 200, 255, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    let animationId: number;

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].alpha <= 0) {
          sparks.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent): void => {
      for (let i = 0; i < 3; i++) {
        sparks.push(new Spark(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default ElectricCursor;
