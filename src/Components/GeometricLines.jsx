import { forwardRef } from "react";

/**
 * GeometricLines — persistent SVG overlay inspired by Shopify Editions Winter '26.
 *
 * A dense architectural wireframe: full-height vertical guides, horizontal rules,
 * sweeping arcs, column outlines, corner brackets, registration crosshairs, and
 * interior rectangles. Drawn via stroke-dashoffset animation from Loader.jsx.
 *
 * z-index 99997 during load (above the Loader overlay at 99996).
 * After loading, Loader drops it to z-index 1 so the lines become a BACKGROUND
 * layer behind all page content (z-index 2). Paths with .geo-rect phase out.
 */
const c = (a) => `rgba(240,235,224,${a})`;

const GeometricLines = forwardRef(function GeometricLines(_, ref) {
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        99997,
        overflow:      "visible",
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*
        Path order = stagger draw order during loading.
        Phase 1: hero arc + primary grid
        Phase 2: structural columns + bars
        Phase 3: secondary grid + brackets
        Phase 4: accent bars + detail brackets
        Phase 5: interior rectangles + diagonals
        Phase 6: secondary arcs + registration crosshairs
      */}

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 1 — Hero arc + primary grid foundation              ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 1 · Large sweeping arc — right side (dominant, draws first) */}
      <path className="geo-path" d="M 870,0 A 790,790 0 0,1 1440,600"
        stroke={c(0.14)} strokeWidth="0.75" fill="none" strokeLinecap="round" />

      {/* 2 · Vertical guide x=510 */}
      <path className="geo-path" d="M 510,0 L 510,900"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 3 · Vertical guide x=680 */}
      <path className="geo-path" d="M 680,0 L 680,900"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 4 · Vertical guide x=1045 */}
      <path className="geo-path" d="M 1045,0 L 1045,900"
        stroke={c(0.05)} strokeWidth="0.4" fill="none" />

      {/* 5 · Horizontal guide y=140 */}
      <path className="geo-path" d="M 0,140 L 1440,140"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 6 · Horizontal guide y=575 */}
      <path className="geo-path" d="M 0,575 L 1440,575"
        stroke={c(0.05)} strokeWidth="0.4" fill="none" />

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 2 — Structural columns + bars                       ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 7 · Top-edge column — left (U-shape) [phases out after load] */}
      <path className="geo-path geo-rect" d="M 510,0 L 510,140 L 680,140 L 680,0"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 8 · Top-edge column — center (taller, shares wall with #7) [phases out] */}
      <path className="geo-path geo-rect" d="M 680,0 L 680,210 L 855,210 L 855,0"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 9 · Top-edge column — far right [phases out] */}
      <path className="geo-path geo-rect" d="M 1215,0 L 1215,80 L 1380,80 L 1380,0"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 10 · Horizontal bar — upper center */}
      <path className="geo-path" d="M 470,210 L 690,210"
        stroke={c(0.15)} strokeWidth="0.75" fill="none" strokeLinecap="round" />

      {/* 11 · Vertical guide x=855 */}
      <path className="geo-path" d="M 855,0 L 855,900"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 3 — Secondary grid + primary brackets               ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 12 · Vertical guide x=360 */}
      <path className="geo-path" d="M 360,0 L 360,900"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 13 · Vertical guide x=1215 */}
      <path className="geo-path" d="M 1215,0 L 1215,900"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 14 · Horizontal guide y=320 */}
      <path className="geo-path" d="M 0,320 L 1440,320"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 15 · Horizontal guide y=750 */}
      <path className="geo-path" d="M 0,750 L 1440,750"
        stroke={c(0.04)} strokeWidth="0.4" fill="none" />

      {/* 16 · Corner bracket — top-left upper (⌐) */}
      <path className="geo-path" d="M 285,195 L 285,240 M 285,195 L 370,195"
        stroke={c(0.16)} strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* 17 · Corner bracket — top-left lower (⌐ flipped) */}
      <path className="geo-path" d="M 285,320 L 285,280 M 285,320 L 370,320"
        stroke={c(0.14)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 4 — Accent bars + detail brackets                   ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 18 · Corner bracket — bottom-right upper */}
      <path className="geo-path" d="M 855,575 L 855,545 M 855,575 L 945,575"
        stroke={c(0.16)} strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* 19 · L-shape — bottom-right lower */}
      <path className="geo-path" d="M 1045,575 L 1045,610 L 855,610"
        stroke={c(0.14)} strokeWidth="0.65" fill="none" strokeLinecap="round" />

      {/* 20 · Horizontal bar — mid-left */}
      <path className="geo-path" d="M 100,400 L 360,400"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 21 · Horizontal bar — mid-right */}
      <path className="geo-path" d="M 855,320 L 1045,320"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 22 · Corner bracket — center-right */}
      <path className="geo-path" d="M 1045,320 L 1045,355 M 1045,320 L 1115,320"
        stroke={c(0.12)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 23 · Corner bracket — bottom-left */}
      <path className="geo-path" d="M 360,750 L 360,715 M 360,750 L 435,750"
        stroke={c(0.12)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 5 — Interior rectangles + diagonal accents          ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 24 · Interior rect — center-bottom (on grid) */}
      <path className="geo-path" d="M 510,575 L 510,750 L 680,750 L 680,575"
        stroke={c(0.07)} strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* 25 · Interior rect — right-mid (on grid) */}
      <path className="geo-path" d="M 1045,320 L 1045,575 L 1215,575 L 1215,320"
        stroke={c(0.07)} strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* 26 · Left diagonal accent */}
      <path className="geo-path" d="M 100,160 L 360,440"
        stroke={c(0.08)} strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* 27 · Right upper diagonal accent */}
      <path className="geo-path" d="M 1140,80 L 980,280"
        stroke={c(0.08)} strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  PHASE 6 — Secondary arcs + registration crosshairs        ║
          ╚══════════════════════════════════════════════════════════════╝ */}

      {/* 28 · Medium arc — bottom-left (mirrors the hero arc) */}
      <path className="geo-path" d="M 0,520 A 620,620 0 0,1 420,900"
        stroke={c(0.10)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 29 · Small semicircle — bottom center */}
      <path className="geo-path" d="M 250,900 A 300,300 0 0,1 550,900"
        stroke={c(0.08)} strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* 30 · Registration crosshair at grid intersection (510, 140) */}
      <path className="geo-path" d="M 500,140 L 520,140 M 510,130 L 510,150"
        stroke={c(0.22)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 31 · Registration crosshair at grid intersection (680, 575) */}
      <path className="geo-path" d="M 670,575 L 690,575 M 680,565 L 680,585"
        stroke={c(0.22)} strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {/* 32 · Registration crosshair at grid intersection (1045, 750) */}
      <path className="geo-path" d="M 1035,750 L 1055,750 M 1045,740 L 1045,760"
        stroke={c(0.22)} strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </svg>
  );
});

export default GeometricLines;
