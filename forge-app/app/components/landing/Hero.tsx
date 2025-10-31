"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

class CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5;
    this.width = width;
    this.height = height;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.5)";
    ctx.fill();
  }
}

export const Hero = () => {
  useEffect(() => {
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement;
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1],
      },
    },
  };

  return (
    <section className="text-center hero-section bg-black h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <canvas id="hero-canvas" className="absolute top-0 left-0 w-full h-full z-0" />
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white"
        >
          Governance,<br />Immutable.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto"
        >
          The Financial Oversight & Resource Governance Engine. <br />Corruption is now a legacy bug.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="https://github.com"
            target="_blank" className="px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]">
            Under the Hood
          </Link>
          <a
            href="/live-dashboard"
            className="px-6 py-3 text-base font-semibold text-white bg-transparent border border-gray-600 rounded-full hover:bg-gray-800 hover:border-gray-500 transition-colors"
          >
            Live Dashboard
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
