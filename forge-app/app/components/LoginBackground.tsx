"use client";

import { useEffect } from "react";

class CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  boundaryX: number;
  boundaryY: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5;
    this.boundaryX = width;
    this.boundaryY = height;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.boundaryX) this.vx *= -1;
    if (this.y < 0 || this.y > this.boundaryY) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.5)";
    ctx.fill();
  }
}

export const LoginBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("login-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth: number, canvasHeight: number, particles: CanvasParticle[];

    function init() {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new CanvasParticle(canvasWidth, canvasHeight));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${1 - dist / 100})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas id="login-canvas" className="absolute top-0 left-0 w-full h-full z-0" />;
};
