import {
  forwardRef,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "About", numeral: "I", id: "about" },
  { label: "Tech Stack", numeral: "II", id: "tech-stack" },
  { label: "Projects", numeral: "III", id: "projects" },
  { label: "Experience", numeral: "IV", id: "experience" },
  { label: "Contact", numeral: "V", id: "contact" },
];

const DOT_COUNT = 15;

const HeroFrame = forwardRef(function HeroFrame({ loaded, geoRef }, ref) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);
  const dotsRefs = useRef([]);
  const scrollTriggerRef = useRef(null);

  // Expose title element to parent so Loader can animate it
  useImperativeHandle(ref, () => titleRef.current);

  // ── Set initial GSAP transforms (before paint) ──
  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50 });
    }
    if (navRef.current) {
      gsap.set(navRef.current, { xPercent: -50 });
    }
  }, []);

  // ── Drop container z-index after loading ──
  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    const t = setTimeout(() => {
      gsap.set(containerRef.current, { zIndex: 10 });
    }, 200);
    return () => clearTimeout(t);
  }, [loaded]);

  // ── Nav reveal + title shift (after loading) ──
  useEffect(() => {
    if (!loaded) return;
    const nav = navRef.current;
    const title = titleRef.current;
    if (!nav || !title) return;

    const tl = gsap.timeline({ delay: 1.5 });

    // Title moves from center of box to top of box
    tl.to(title, {
      top: "33%",
      duration: 1.0,
      ease: "power3.out",
    });

    // Nav container becomes visible
    tl.to(nav, { opacity: 1, duration: 0.01 }, "-=0.5");

    // Each nav item staggers in
    tl.fromTo(
      nav.querySelectorAll(".hero-nav-item"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power2.out",
      },
      "<"
    );

    return () => tl.kill();
  }, [loaded]);

  // ── Scroll-driven repositioning ──
  useEffect(() => {
    if (!loaded) return;
    const title = titleRef.current;
    const nav = navRef.current;
    if (!title || !nav) return;

    const delay = setTimeout(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=600",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // Title: top-of-box → top-left corner
          gsap.set(title, {
            top: `${gsap.utils.interpolate(33, 5, p)}%`,
            left: `${gsap.utils.interpolate(50, 4, p)}%`,
            xPercent: gsap.utils.interpolate(-50, 0, p),
            yPercent: gsap.utils.interpolate(-50, 0, p),
            scale: gsap.utils.interpolate(1, 0.5, p),
            transformOrigin: "top left",
          });

          // Nav: below title → bottom-left
          gsap.set(nav, {
            top: `${gsap.utils.interpolate(46, 80, p)}%`,
            left: `${gsap.utils.interpolate(50, 4, p)}%`,
            xPercent: gsap.utils.interpolate(-50, 0, p),
          });

          // Geo box: fade out on scroll
          const svg = geoRef?.current;
          if (svg) {
            const boxes = svg.querySelectorAll(".geo-box");
            gsap.set(boxes, { opacity: 1 - p });
          }
        },
      });
    }, 3500);

    return () => {
      clearTimeout(delay);
      scrollTriggerRef.current?.kill();
    };
  }, [loaded]);

  // ── Dot hover handlers ──
  const handleMouseEnter = useCallback((index) => {
    const dots = dotsRefs.current[index];
    if (!dots) return;
    const dotEls = dots.querySelectorAll(".hero-dot");
    gsap.killTweensOf(dotEls);
    gsap.fromTo(
      dotEls,
      { opacity: 0, scale: 0, y: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: { each: 0.035, from: "start" },
        ease: "back.out(2.5)",
      }
    );
    // Ripple wave
    gsap.to(dotEls, {
      y: -2.5,
      duration: 0.25,
      stagger: { each: 0.04, from: "start", yoyo: true, repeat: 1 },
      ease: "sine.inOut",
      delay: 0.1,
    });
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const dots = dotsRefs.current[index];
    if (!dots) return;
    const dotEls = dots.querySelectorAll(".hero-dot");
    gsap.killTweensOf(dotEls);
    gsap.to(dotEls, {
      opacity: 0,
      scale: 0,
      y: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99997,
        pointerEvents: "none",
      }}
    >
      {/* ── Title ── */}
      <div
        ref={titleRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          textAlign: "left",
          whiteSpace: "nowrap",
          opacity: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
            color: "var(--cream)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Nadeem&rsquo;s
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(0.7rem, 1.3vw, 1rem)",
            color: "var(--cream-dim)",
            lineHeight: 1.2,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: "0.3rem",
          }}
        >
          Portfolio
        </div>
      </div>

      {/* ── Navigation ── */}
      <div
        ref={navRef}
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          opacity: 0,
          pointerEvents: "auto",
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="hero-nav-item"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0",
              width: "260px",
              textDecoration: "none",
              position: "relative",
              opacity: 0,
            }}
          >
            <span
              className="hero-nav-label"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "var(--cream)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>

            {/* Dot leader */}
            <div
              ref={(el) => (dotsRefs.current[i] = el)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                margin: "0 0.6rem",
              }}
            >
              {Array.from({ length: DOT_COUNT }).map((_, j) => (
                <span
                  key={j}
                  className="hero-dot"
                  style={{
                    width: "2px",
                    height: "2px",
                    borderRadius: "50%",
                    background: "var(--cream-dim)",
                    opacity: 0,
                    display: "block",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            <span
              className="hero-nav-numeral"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--cream-dim)",
                letterSpacing: "0.08em",
              }}
            >
              {item.numeral}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
});

export default HeroFrame;
