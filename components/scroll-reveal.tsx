"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
};

export function ScrollReveal({ children, className = "", direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Keep reveal reliable for very tall mobile sections (e.g., project lists).
        threshold: 0.01,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal-direction={direction}
      className={`reveal-block ${revealed ? "reveal-block--in" : "reveal-block--pending"} ${className}`}
    >
      {children}
    </div>
  );
}
