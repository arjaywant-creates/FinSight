"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
}

const SPARKLE_COLORS = [
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#d946ef", // fuchsia
  "#f59e0b", // amber
  "#fbbf24", // yellow
  "#c084fc", // light purple
  "#e879f9", // light fuchsia
  "#fcd34d", // light gold
];

// Seeded pseudo-random to avoid hydration mismatches
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function useSparkleConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  const fire = useCallback((originX?: number, originY?: number) => {
    const centerX = originX ?? window.innerWidth / 2;
    const centerY = originY ?? window.innerHeight / 2;
    const newParticles: Particle[] = [];

    for (let i = 0; i < 40; i++) {
      idRef.current++;
      newParticles.push({
        id: idRef.current,
        x: centerX,
        y: centerY,
        size: Math.random() * 8 + 4,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        delay: Math.random() * 0.2,
        duration: Math.random() * 0.8 + 0.6,
        angle: (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5,
        distance: Math.random() * 150 + 80,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1500);
  }, []);

  return { particles, fire };
}

export function SparkleConfetti({ particles }: { particles: Particle[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.distance,
              y: p.y + Math.sin(p.angle) * p.distance - 40,
              opacity: 0,
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{
              width: p.size,
              height: p.size,
            }}
          >
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full">
              <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface SparkleData {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export function FloatingSparkles({ count = 6, seed = 42 }: { count?: number; seed?: number }) {
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    const rand = seededRandom(seed);
    setSparkles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        delay: rand() * 4,
        duration: rand() * 3 + 2,
        size: rand() * 12 + 6,
        color: SPARKLE_COLORS[Math.floor(rand() * SPARKLE_COLORS.length)],
      }))
    );
    setMounted(true);
  }, [count, seed]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={s.color}
            style={{ width: s.size, height: s.size }}
          >
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function MagicLoadingSpinner() {
  return (
    <div className="flex items-center gap-2 text-sm text-purple-400">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-violet-500">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-violet-500/20 blur-sm"
        />
      </div>
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Casting spell...
      </motion.span>
    </div>
  );
}
