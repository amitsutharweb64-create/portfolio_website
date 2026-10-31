import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const el = progressBarRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={progressBarRef}
        className="h-full bg-gradient-to-r from-[#a3e635] via-[#bef264] to-emerald-400 origin-left scale-x-0 shadow-[0_0_12px_#a3e635]"
      />
    </div>
  );
}
