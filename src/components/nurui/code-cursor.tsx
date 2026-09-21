"use client";
import React, { useEffect, useRef } from "react";

interface IBinaryChar {
  x: number;
  y: number;
  alpha: number;
  char: "0" | "1";
  color: string;
  update: () => void;
  draw: () => void;
}

const CodeCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: IBinaryChar[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class BinaryChar {
      x: number;
      y: number;
      alpha: number;
      char: "0" | "1";
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.char = Math.random() > 0.5 ? "1" : "0";

        // Assign different colors for 0 and 1
        this.color = this.char === "0" ? "#00FFC6" : "#00B4FF"; // mint and blue
      }

      update() {
        this.y -= 0.5;
        this.alpha -= 0.02;
      }

      draw() {
        ctx.fillStyle = `${this.color}${Math.floor(this.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`; // Apply fading alpha as hex
        ctx.font = "18px monospace";
        ctx.fillText(this.char, this.x, this.y);
      }
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push(new BinaryChar(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default CodeCursor;
