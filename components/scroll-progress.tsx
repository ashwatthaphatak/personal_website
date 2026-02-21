"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(nextProgress);
    };

    const queueUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <span className="scroll-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
