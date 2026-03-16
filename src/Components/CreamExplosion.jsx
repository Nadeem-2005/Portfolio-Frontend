import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Clean circle explosion — flash grenade style ── */

const OX = 0.42;  // shifted left of center (fingertip touch point)
const OY = 0.44;  // just above "About" link
const HERO_SCROLL = () => window.innerHeight;

export default function CreamExplosion({ loaded }) {
  const canvasRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const progressRef = useRef(0);

  /* ── Resize canvas ── */
  const sizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = w + "px";
    c.style.height = h + "px";
  }, []);

  /* ── Draw flash explosion at given progress (0→1) ── */
  const drawExplosion = useCallback((progress) => {
    const c = canvasRef.current;
    if (!c) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (progress <= 0) return;

    const cx = w * OX;
    const cy = h * OY;

    // Max radius = distance from origin to farthest corner + buffer
    // so the solid fill (radius - edgeWidth*0.5) still covers every pixel
    const maxR = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(w - cx, cy),
      Math.hypot(cx, h - cy),
      Math.hypot(w - cx, h - cy)
    ) * 1.15;

    const radius = progress * maxR;
    const edgeWidth = 30 + progress * 60; // soft glow band width

    // 1. Solid cream circle (the filled area)
    if (progress > 0.05) {
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(radius - edgeWidth * 0.5, 0), 0, Math.PI * 2);
      ctx.fillStyle = "#F0EBE0";
      ctx.fill();
    }

    // 2. Bright white glow at the leading edge
    const glowGrad = ctx.createRadialGradient(
      cx, cy, Math.max(radius - edgeWidth, 0),
      cx, cy, radius + edgeWidth * 0.3
    );
    glowGrad.addColorStop(0, "rgba(240, 235, 224, 1)");    // cream solid
    glowGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.95)"); // white hot
    glowGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.5)");  // fading
    glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");       // transparent

    ctx.beginPath();
    ctx.arc(cx, cy, radius + edgeWidth * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // 3. Intense point glow at origin (the "flash")
    const flashIntensity = Math.max(1 - progress * 1.5, 0);
    if (flashIntensity > 0) {
      const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashIntensity})`);
      flashGrad.addColorStop(0.4, `rgba(255, 250, 240, ${flashIntensity * 0.5})`);
      flashGrad.addColorStop(1, "rgba(255, 250, 240, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = flashGrad;
      ctx.fill();
    }
  }, []);

  /* ── Resize + redraw to persist explosion state ── */
  useEffect(() => {
    const handleResize = () => {
      sizeCanvas();
      drawExplosion(progressRef.current);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sizeCanvas, drawExplosion]);

  /* ── Scroll-driven — fixed to hero zone ── */
  useEffect(() => {
    if (!loaded) return;

    const delay = setTimeout(() => {
      drawExplosion(0);

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: `+=${HERO_SCROLL()}`,
        scrub: 0.6,
        onUpdate: (self) => {
          const raw = self.progress;
          // Fingers touch at ~80% scroll → explosion 75%→90%
          const p = raw < 0.75 ? 0 : Math.min((raw - 0.75) / 0.15, 1.0);
          progressRef.current = p;
          drawExplosion(p);
        },
      });
    }, 2200);

    return () => {
      clearTimeout(delay);
      scrollTriggerRef.current?.kill();
    };
  }, [loaded, drawExplosion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
