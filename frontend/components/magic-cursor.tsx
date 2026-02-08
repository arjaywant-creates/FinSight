"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const SPARKLE_COLORS = ["#8b5cf6", "#d946ef", "#fbbf24", "#a855f7", "#e879f9", "#fcd34d"];

type CursorMode = "default" | "hover" | "text";

export function MagicCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailId = useRef(0);
  const trailTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateCursorMode = useCallback((target: Element | null) => {
    if (!target) return;
    const el = target as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "input" || tag === "textarea" || el.isContentEditable) {
      setMode("text");
    } else if (
      tag === "a" ||
      tag === "button" ||
      tag === "select" ||
      tag === "summary" ||
      el.getAttribute("role") === "button" ||
      el.closest("a, button, [role='button'], label, select, summary") ||
      (el.getAttribute("tabindex") && el.getAttribute("tabindex") !== "-1") ||
      getComputedStyle(el).cursor === "pointer"
    ) {
      setMode("hover");
    } else {
      setMode("default");
    }
  }, []);

  useEffect(() => {
    // Hide on pure touch devices (no mouse/trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
      updateCursorMode(e.target as Element);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, visible, updateCursorMode]);

  // Sparkle trail when hovering interactive elements
  useEffect(() => {
    if (mode === "hover") {
      trailTimer.current = setInterval(() => {
        trailId.current++;
        const id = trailId.current;
        setTrails((prev) => [
          ...prev.slice(-6),
          { id, x: mouseX.get(), y: mouseY.get() },
        ]);
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id));
        }, 600);
      }, 80);
    } else {
      if (trailTimer.current) clearInterval(trailTimer.current);
      setTrails([]);
    }
    return () => {
      if (trailTimer.current) clearInterval(trailTimer.current);
    };
  }, [mode, mouseX, mouseY]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2147483647 }}>
      {/* Sparkle trails on hover */}
      <AnimatePresence>
        {trails.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ x: t.x - 4, y: t.y - 4, opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0, rotate: 180, y: t.y - 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute"
          >
            <svg viewBox="0 0 24 24" width="8" height="8" fill={SPARKLE_COLORS[i % SPARKLE_COLORS.length]}>
              <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="absolute"
        style={{ x: mouseX, y: mouseY }}
      >
        {/* Wand */}
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="absolute"
          style={{ left: -5, top: -5 }}
          animate={
            mode === "hover"
              ? { rotate: [0, -8, 5, -3, 0] }
              : mode === "text"
                ? { rotate: 0 }
                : { rotate: [0, -3, 0] }
          }
          transition={
            mode === "hover"
              ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {mode === "text" ? (
            /* Text select cursor - vertical bar with glow */
            <>
              <line x1="5" y1="2" x2="5" y2="30" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="2" x2="5" y2="30" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" />
              <line x1="2" y1="3" x2="8" y2="3" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="29" x2="8" y2="29" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            /* Wand cursor */
            <>
              <line x1="6" y1="6" x2="26" y2="26" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6" y1="6" x2="26" y2="26" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" />
              <circle cx="5" cy="5" r="3" fill="#f59e0b" opacity="0.6" />
              <circle cx="5" cy="5" r="1.5" fill="#fbbf24" />
            </>
          )}
        </motion.svg>

        {/* Glow around tip */}
        {mode !== "text" && (
          <motion.div
            className="absolute rounded-full"
            style={{ left: -8, top: -8, width: 16, height: 16 }}
            animate={{
              boxShadow:
                mode === "hover"
                  ? [
                      "0 0 6px 2px rgba(251,191,36,0.5)",
                      "0 0 14px 4px rgba(217,70,239,0.5)",
                      "0 0 6px 2px rgba(251,191,36,0.5)",
                    ]
                  : [
                      "0 0 4px 1px rgba(251,191,36,0.25)",
                      "0 0 8px 2px rgba(251,191,36,0.35)",
                      "0 0 4px 1px rgba(251,191,36,0.25)",
                    ],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Text cursor glow */}
        {mode === "text" && (
          <motion.div
            className="absolute rounded-full"
            style={{ left: -4, top: 8, width: 8, height: 8 }}
            animate={{
              boxShadow: [
                "0 0 4px 1px rgba(139,92,246,0.3)",
                "0 0 10px 3px rgba(139,92,246,0.5)",
                "0 0 4px 1px rgba(139,92,246,0.3)",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Sparkles around wand tip - default: subtle, hover: bigger & more */}
        {mode !== "text" && (
          <>
            {(mode === "hover" ? [0, 1, 2, 3, 4, 5] : [0, 1, 2]).map((i) => {
              const count = mode === "hover" ? 6 : 3;
              const radius = mode === "hover" ? 18 : 10;
              const size = mode === "hover" ? 7 : 4;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: -5, top: -5 }}
                  animate={{
                    x: [0, Math.cos((Math.PI * 2 * i) / count) * radius],
                    y: [0, Math.sin((Math.PI * 2 * i) / count) * radius],
                    opacity: [0, mode === "hover" ? 0.9 : 0.5, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: mode === "hover" ? 0.9 : 1.8,
                    repeat: Infinity,
                    delay: i * (mode === "hover" ? 0.15 : 0.6),
                    ease: "easeInOut",
                  }}
                >
                  <svg viewBox="0 0 24 24" width={size} height={size} fill={SPARKLE_COLORS[i % SPARKLE_COLORS.length]}>
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
                  </svg>
                </motion.div>
              );
            })}
          </>
        )}
      </motion.div>
    </div>
  );
}
