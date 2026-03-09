import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * Loader — burning paper dissolve.
 *
 * A 2D noise field (value noise + radial bias) is pre-computed once.
 * Each frame, a threshold sweeps from 0→1. Pixels whose noise value
 * falls below the threshold become transparent (burned away). Pixels
 * near the threshold glow white/cream (the burn front). Center burns
 * first thanks to the radial bias — exactly like paper burning inward.
 */

// ── Value noise helpers (module-level, no React dependency) ──────────

const G = 128;
const grid = new Float32Array(G * G);
for (let i = 0; i < G * G; i++) grid[i] = Math.random();

function vnoise(x, y) {
  const ix = ((Math.floor(x) % G) + G) % G;
  const iy = ((Math.floor(y) % G) + G) % G;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  // Smoothstep
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const ix1 = (ix + 1) % G;
  const iy1 = (iy + 1) % G;
  const n00 = grid[iy  * G + ix];
  const n10 = grid[iy  * G + ix1];
  const n01 = grid[iy1 * G + ix];
  const n11 = grid[iy1 * G + ix1];
  return n00 + (n10 - n00) * sx + (n01 - n00) * sy
       + (n00 - n10 - n01 + n11) * sx * sy;
}

function fbm(x, y) {
  let v = 0, a = 1, t = 0;
  for (let o = 0; o < 5; o++) {
    v += vnoise(x, y) * a;
    t += a;
    a *= 0.5;
    x *= 2;
    y *= 2;
  }
  return v / t;
}

// ── Component ────────────────────────────────────────────────────────

export default function Loader({ onComplete, geoRef }) {
  const wrapperRef  = useRef(null);
  const canvasRef   = useRef(null);
  const textRef     = useRef(null);
  const barRef      = useRef(null);
  const counterRef  = useRef(null);
  const progressRef = useRef(null);
  const noiseRef    = useRef(null);

  // ── Pre-compute noise field (runs ONCE) ──
  useEffect(() => {
    const S = 512;
    const off = document.createElement("canvas");
    off.width = S;
    off.height = S;
    const ctx = off.getContext("2d");
    const imgData = ctx.createImageData(S, S);
    const field = new Float32Array(S * S);

    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = y * S + x;
        // Normalized coords: center = (0,0), corners = (-1,-1)..(1,1)
        const nx = (x / S - 0.5) * 2;
        const ny = (y / S - 0.5) * 2;
        // Radial distance: 0 at center, ~1.41 at corners
        const dist = Math.sqrt(nx * nx + ny * ny);
        // Fractal noise
        const n = fbm(x * 0.015 + 3.7, y * 0.015 + 7.1);
        // Combine: center has LOW values (burns first), edges HIGH
        field[i] = dist * 0.6 + n * 0.4;
      }
    }

    noiseRef.current = { field, imgData, offCanvas: off, offCtx: ctx, S };
  }, []);

  // ── Size main canvas to viewport ──
  const sizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width  = w * dpr;
    c.height = h * dpr;
    c.style.width  = w + "px";
    c.style.height = h + "px";
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, [sizeCanvas]);

  // ── Render burn frame at given threshold ──
  const drawBurn = useCallback((threshold) => {
    const c = canvasRef.current;
    const n = noiseRef.current;
    if (!c || !n) return;

    const { field, imgData, offCanvas, offCtx, S } = n;
    const data = imgData.data;

    for (let i = 0; i < S * S; i++) {
      const v = field[i];
      const px = i * 4;

      if (v < threshold) {
        // Burned away — fully transparent
        data[px] = 0; data[px + 1] = 0; data[px + 2] = 0; data[px + 3] = 0;
      } else if (v < threshold + 0.012) {
        // Hottest edge — bright white
        data[px] = 255; data[px + 1] = 255; data[px + 2] = 255; data[px + 3] = 255;
      } else if (v < threshold + 0.04) {
        // Warm glow — white fading to cream
        const t = (v - threshold - 0.012) / 0.028;
        data[px]     = 255 - Math.round(15 * t);
        data[px + 1] = 255 - Math.round(20 * t);
        data[px + 2] = 255 - Math.round(31 * t);
        data[px + 3] = 255;
      } else if (v < threshold + 0.10) {
        // Cream fading to black
        const t = (v - threshold - 0.04) / 0.06;
        data[px]     = Math.round(240 * (1 - t));
        data[px + 1] = Math.round(235 * (1 - t));
        data[px + 2] = Math.round(224 * (1 - t));
        data[px + 3] = 255;
      } else {
        // Intact overlay — solid black
        data[px] = 0; data[px + 1] = 0; data[px + 2] = 0; data[px + 3] = 255;
      }
    }

    offCtx.putImageData(imgData, 0, 0);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(offCanvas, 0, 0, w, h);
  }, []);

  // ── Init geo stroke dashes before first paint ──
  useLayoutEffect(() => {
    const svg = geoRef?.current;
    if (!svg) return;
    svg.querySelectorAll(".geo-path").forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray  = len;
      p.style.strokeDashoffset = len;
    });
  }, [geoRef]);

  // ── Main animation sequence ──
  useEffect(() => {
    const svg = geoRef?.current;
    if (svg) {
      gsap.to(svg.querySelectorAll(".geo-path"), {
        strokeDashoffset: 0,
        duration:         1.8,
        stagger:          0.07,
        ease:             "power2.inOut",
        delay:            0.2,
      });
    }

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.35 }
    );

    let count = 0;

    const tick = () => {
      count += Math.floor(Math.random() * 4) + 2;

      if (count >= 100) {
        count = 100;
        if (counterRef.current) counterRef.current.textContent = "100";
        if (barRef.current) gsap.set(barRef.current, { scaleX: 1 });

        setTimeout(() => {
          const wrapper = wrapperRef.current;
          const geoEl   = geoRef?.current;

          const burn = { t: -0.05 };
          const exit = gsap.timeline();

          // 1. Text + progress fade together
          exit.to(textRef.current, {
            y: -20, opacity: 0, duration: 0.35, ease: "power3.in",
          });
          exit.to(progressRef.current, {
            opacity: 0, duration: 0.3, ease: "power2.in",
          }, "<");

          // 2. Burn dissolve — threshold sweeps from -0.05 to 1.4
          exit.to(burn, {
            t:        1.4,
            duration: 2.2,
            ease:     "power2.inOut",
            onUpdate: () => drawBurn(burn.t),
          }, "-=0.1");

          // 3. Drop geo to background layer
          exit.set(geoEl, { zIndex: 1 });

          // 4. Unmount loader
          exit.call(() => onComplete?.());
          exit.set(wrapper, { display: "none" });

          // 5. Geo background transition
          if (svg) {
            exit.to(svg.querySelectorAll(".geo-rect"), {
              opacity: 0, duration: 1.2, ease: "power2.inOut",
            });
          }
          exit.to(geoEl, {
            opacity: 0.6, duration: 2.5, ease: "power2.inOut",
          }, "<");
        }, 200);

        return;
      }

      if (counterRef.current)
        counterRef.current.textContent = count < 10 ? `0${count}` : String(count);
      if (barRef.current)
        gsap.set(barRef.current, { scaleX: count / 100 });

      setTimeout(tick, 44);
    };

    setTimeout(tick, 44);
  }, [onComplete, geoRef, drawBurn]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset:    0,
        zIndex:   99996,
      }}
    >
      {/* ── Canvas overlay — black, burns away from center ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset:    0,
        }}
      />

      {/* ── Loading text ── */}
      <div
        ref={textRef}
        style={{
          position:  "absolute",
          left:      "35%",
          top:       "48%",
          transform: "translateY(-50%)",
          opacity:   0,
          zIndex:    2,
        }}
      >
        <div style={{
          fontFamily:    "var(--font-body)",
          fontWeight:    400,
          fontSize:      "1rem",
          color:         "var(--cream)",
          letterSpacing: "0.05em",
          lineHeight:    1.2,
          marginBottom:  "0.15rem",
        }}>
          The Art of
        </div>

        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle:  "italic",
          fontSize:   "clamp(2.2rem, 4.8vw, 4.5rem)",
          color:      "var(--cream)",
          lineHeight: 1,
        }}>
          Engineering
        </div>
      </div>

      {/* ── Bottom progress strip ── */}
      <div
        ref={progressRef}
        style={{
          position:   "absolute",
          bottom:     "2.75rem",
          left:       "3rem",
          right:      "3rem",
          display:    "flex",
          alignItems: "center",
          gap:        "1.4rem",
          zIndex:     2,
        }}
      >
        <div
          ref={counterRef}
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.58rem",
            letterSpacing: "0.06em",
            color:         "var(--cream-dim)",
            minWidth:      "2rem",
            lineHeight:    1,
          }}
        >
          00
        </div>

        <div style={{
          flex:       1,
          height:     "1px",
          background: "var(--border)",
          overflow:   "hidden",
          position:   "relative",
        }}>
          <div
            ref={barRef}
            style={{
              position:        "absolute",
              inset:           0,
              background:      "var(--gold)",
              transformOrigin: "left center",
              transform:       "scaleX(0)",
            }}
          />
        </div>

        <div style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.58rem",
          letterSpacing: "0.06em",
          color:         "var(--cream-dim)",
          lineHeight:    1,
        }}>
          nadeem.dev
        </div>
      </div>
    </div>
  );
}
