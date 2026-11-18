"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pengganti PureCounter (purecounter_vanilla.js) — animasi angka
 * yang sama (start -> end dalam `duration` detik), dipicu saat terlihat.
 * Implementasi native IntersectionObserver agar tidak bergantung
 * pada script vendor lama.
 */
export default function PureCounter({
  end,
  duration = 1,
}: {
  end: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            setValue(Math.round(end * progress));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="purecounter">
      {value}
    </span>
  );
}
