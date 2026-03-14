import {
  forwardRef,
  useRef,
  useState,
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
const MOBILE_BP = 768;
const HERO_SCROLL = () => window.innerHeight;

const HeroFrame = forwardRef(function HeroFrame({ loaded, geoRef }, ref) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);
  const dotsRefs = useRef([]);
  const scrollTriggerRef = useRef(null);
  const colorTriggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Expose title element so Loader can animate it
  useImperativeHandle(ref, () => titleRef.current);

  // ── Mobile detection ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // ── Scroll-driven repositioning (desktop only) ──
  useEffect(() => {
    if (!loaded || isMobile) return;
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
          const vh = window.innerHeight;
          const navH = nav.offsetHeight;
          // Pin nav bottom 2.5rem above viewport bottom
          const finalNavTop = ((vh - navH - 40) / vh) * 100;

          // Title: top-of-box → top-left corner
          gsap.set(title, {
            top: `${gsap.utils.interpolate(33, 5, p)}%`,
            left: `${gsap.utils.interpolate(50, 4, p)}%`,
            xPercent: gsap.utils.interpolate(-50, 0, p),
            yPercent: gsap.utils.interpolate(-50, 0, p),
            scale: gsap.utils.interpolate(1, 0.55, p),
            transformOrigin: "top left",
            force3D: true,
          });

          // Nav: below title → bottom-left (all links visible)
          gsap.set(nav, {
            top: `${gsap.utils.interpolate(46, finalNavTop, p)}%`,
            left: `${gsap.utils.interpolate(50, 4, p)}%`,
            xPercent: gsap.utils.interpolate(-50, 0, p),
            force3D: true,
          });

          // Geo box: fade out on scroll
          const svg = geoRef?.current;
          if (svg) {
            gsap.set(svg.querySelectorAll(".geo-box"), { opacity: 1 - p });
          }
        },
      });
    }, 3500);

    return () => {
      clearTimeout(delay);
      scrollTriggerRef.current?.kill();
    };
  }, [loaded, isMobile, geoRef]);

  // ── Mobile: scroll whole frame up ──
  useEffect(() => {
    if (!loaded || !isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const delay = setTimeout(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=400",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(container, {
            y: `${-p * 100}%`,
            force3D: true,
          });
        },
      });
    }, 3500);

    return () => {
      clearTimeout(delay);
      scrollTriggerRef.current?.kill();
    };
  }, [loaded, isMobile]);

  // ── Color flip when cream explosion covers screen ──
  useEffect(() => {
    if (!loaded) return;
    const title = titleRef.current;
    const nav = navRef.current;
    if (!title || !nav) return;

    const delay = setTimeout(() => {
      colorTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: `+=${HERO_SCROLL()}`,
        scrub: 0.3,
        onUpdate: (self) => {
          const raw = self.progress;
          // Match explosion timing: starts at 75%, full at 90%
          const p = raw < 0.75 ? 0 : Math.min((raw - 0.75) / 0.15, 1.0);
          const dark = "var(--bg)";
          const light = "var(--cream)";
          const color = p > 0.5 ? dark : light;
          const dimColor = p > 0.5 ? "rgba(10,9,8,0.55)" : "var(--cream-dim)";

          // Title
          title.querySelector("[data-title]").style.color = color;
          title.querySelector("[data-subtitle]").style.color = p > 0.5 ? dimColor : light;

          // Nav labels + numerals
          nav.querySelectorAll(".hero-nav-label").forEach((el) => {
            el.style.color = color;
          });
          nav.querySelectorAll(".hero-nav-numeral").forEach((el) => {
            el.style.color = dimColor;
          });
          nav.querySelectorAll(".hero-dot").forEach((el) => {
            el.style.background = dimColor;
          });
        },
      });
    }, 3600);

    return () => {
      clearTimeout(delay);
      colorTriggerRef.current?.kill();
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
      {/* ── Mobile: "View on desktop" banner ── */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            whiteSpace: "nowrap",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 2s",
            pointerEvents: "none",
          }}
        >
          Best viewed on desktop
        </div>
      )}

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
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          data-title
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
            color: "var(--cream)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            transition: "color 0.4s ease",
          }}
        >
          Nadeem&rsquo;s
        </div>
        <div
          data-subtitle
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(0.7rem, 1.3vw, 1rem)",
            color: "var(--cream-dim)",
            lineHeight: 1.2,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: "0.3rem",
            transition: "color 0.4s ease",
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
          willChange: "transform",
          backfaceVisibility: "hidden",
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
                fontSize: "0.85rem",
                fontWeight: 600,
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
