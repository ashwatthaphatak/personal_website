"use client";

import { useEffect, useRef } from "react";

const MATRIX_CHARS = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
const MATRIX_COLORS = [
  "rgba(255, 96, 116, 0.9)",
  "rgba(255, 72, 94, 0.82)",
  "rgba(236, 50, 73, 0.74)",
  "rgba(208, 36, 57, 0.66)"
];

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const fontSize = 13;
    const frameIntervalMs = 50;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let frame = 0;
    let lastDrawTime = 0;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastDrawTime < frameIntervalMs) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = timestamp;

      const isDarkTheme = document.documentElement.classList.contains("dark");
      context.fillStyle = isDarkTheme ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.05)";
      context.fillRect(0, 0, width, height);

      context.font = `${fontSize}px Menlo, Monaco, Consolas, monospace`;

      for (let index = 0; index < drops.length; index += 1) {
        const text = MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        context.fillStyle = MATRIX_COLORS[(index + Math.floor(Math.random() * MATRIX_COLORS.length)) % MATRIX_COLORS.length];
        context.fillText(text, x, y);

        if (y > height && Math.random() > 0.986) {
          drops[index] = 0;
        }

        drops[index] += 0.88;
      }

      frame = window.requestAnimationFrame(draw);
    };

    setupCanvas();
    frame = window.requestAnimationFrame(draw);

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.46]"
      aria-hidden
    />
  );
}
