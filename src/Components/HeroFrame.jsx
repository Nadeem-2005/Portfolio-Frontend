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
  const activeSectionRef = useRef(null);
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

  // ── Nav reveal + title shift (after loading, scroll blocked until done) ──
  useEffect(() => {
    if (!loaded) return;
    const nav = navRef.current;
    const title = titleRef.current;
    if (!nav || !title) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      delay: 0.8,
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Title moves from center of box to top of box
    tl.to(title, {
      top: "33%",
      duration: 0.7,
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

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
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
            scale: gsap.utils.interpolate(1.15, 0.85, p),
            transformOrigin: "top left",
            force3D: true,
          });

          // Geo box: fade out on scroll
          const svg = geoRef?.current;
          if (svg) {
            gsap.set(svg.querySelectorAll(".geo-box"), { opacity: 1 - p });
          }
        },
      });
    }, 2200);

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
    }, 2200);

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

          const glow = p > 0.5 ? "none" : "0 0 10px rgba(240,235,224,0.9), 0 0 40px rgba(240,235,224,0.7), 0 0 80px rgba(240,235,224,0.4), 0 0 120px rgba(240,235,224,0.2)";
          const glowSm = p > 0.5 ? "none" : "0 0 8px rgba(240,235,224,0.8), 0 0 30px rgba(240,235,224,0.6), 0 0 60px rgba(240,235,224,0.3)";
          const stroke = p > 0.5 ? "0px rgba(0,0,0,0)" : "0.6px rgba(0,0,0,0.5)";
          const strokeSm = p > 0.5 ? "0px rgba(0,0,0,0)" : "0.4px rgba(0,0,0,0.4)";

          // Title
          const titleEl = title.querySelector("[data-title]");
          titleEl.style.color = color;
          titleEl.style.textShadow = glow;
          titleEl.style.webkitTextStroke = stroke;
          const subtitleEl = title.querySelector("[data-subtitle]");
          subtitleEl.style.color = p > 0.5 ? dimColor : light;
          subtitleEl.style.textShadow = glowSm;
          subtitleEl.style.webkitTextStroke = strokeSm;

          // Nav labels + numerals
          nav.querySelectorAll(".hero-nav-label").forEach((el) => {
            el.style.color = color;
            el.style.textShadow = glowSm;
            el.style.webkitTextStroke = strokeSm;
          });
          nav.querySelectorAll(".hero-nav-numeral").forEach((el) => {
            el.style.color = dimColor;
          });
          nav.querySelectorAll(".hero-dot").forEach((el) => {
            el.style.background = dimColor;
          });

          // Geo lines: smoothly flip from cream to dark as explosion covers
          const svg = geoRef?.current;
          if (svg) {
            svg.style.opacity = String(0.6 + 0.4 * p);
            svg.querySelectorAll('.geo-path').forEach(el => {
              const a = parseFloat(el.dataset.alpha);
              if (isNaN(a)) return;
              const darkA = Math.min(a * 1.5, 0.22);
              const r = Math.round(240 - 230 * p);
              const g = Math.round(235 - 226 * p);
              const b = Math.round(224 - 216 * p);
              const alpha = a + (darkA - a) * p;
              el.style.stroke = `rgba(${r},${g},${b},${alpha})`;
            });
          }
        },
      });
    }, 2400);

    return () => {
      clearTimeout(delay);
      colorTriggerRef.current?.kill();
    };
  }, [loaded, geoRef]);

  // ── Active section highlighting + dark-bg color fix ──
  useEffect(() => {
    if (!loaded) return;
    const nav = navRef.current;
    const title = titleRef.current;
    if (!nav || !title) return;

    const sectionIds = NAV_ITEMS.map((item) => item.id);
    let rafId = null;

    const update = () => {
      const scrollY = window.scrollY;
      const heroEnd = window.innerHeight * 1.2;

      // Only run after hero scroll zone
      if (scrollY < heroEnd) {
        activeSectionRef.current = null;
        rafId = null;
        return;
      }

      // Find which section is at 40% viewport height
      const checkY = window.innerHeight * 0.4;
      let activeId = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom > checkY) {
          activeId = id;
          break;
        }
      }

      // Highlight active nav item
      const navItems = nav.querySelectorAll(".hero-nav-item");
      navItems.forEach((item, i) => {
        const label = item.querySelector(".hero-nav-label");
        const numeral = item.querySelector(".hero-nav-numeral");
        if (!label || !numeral) return;
        const isActive = NAV_ITEMS[i].id === activeId;
        label.style.letterSpacing = isActive ? "0.08em" : "0.01em";
        label.style.opacity = isActive ? "1" : "0.6";
        numeral.style.opacity = isActive ? "0.8" : "0.4";
      });

      // Detect dark section (contact) and flip nav/title colors
      const onDark = activeId === "contact";
      if (onDark !== (activeSectionRef.current === "contact")) {
        const color = onDark ? "var(--cream)" : "var(--bg)";
        const dimColor = onDark ? "var(--cream-dim)" : "rgba(10,9,8,0.55)";

        const titleEl = title.querySelector("[data-title]");
        const subtitleEl = title.querySelector("[data-subtitle]");
        if (titleEl) {
          titleEl.style.color = color;
          titleEl.style.textShadow = onDark ? "0 0 10px rgba(240,235,224,0.9), 0 0 40px rgba(240,235,224,0.7), 0 0 80px rgba(240,235,224,0.4)" : "none";
          titleEl.style.webkitTextStroke = onDark ? "0.6px rgba(0,0,0,0.5)" : "0px rgba(0,0,0,0)";
        }
        if (subtitleEl) {
          subtitleEl.style.color = onDark ? dimColor : dimColor;
          subtitleEl.style.textShadow = onDark ? "0 0 8px rgba(240,235,224,0.8), 0 0 30px rgba(240,235,224,0.6)" : "none";
          subtitleEl.style.webkitTextStroke = onDark ? "0.4px rgba(0,0,0,0.4)" : "0px rgba(0,0,0,0)";
        }

        nav.querySelectorAll(".hero-nav-label").forEach((el) => {
          el.style.color = color;
          el.style.textShadow = onDark ? "0 0 8px rgba(240,235,224,0.8), 0 0 30px rgba(240,235,224,0.6)" : "none";
          el.style.webkitTextStroke = onDark ? "0.4px rgba(0,0,0,0.4)" : "0px rgba(0,0,0,0)";
        });
        nav.querySelectorAll(".hero-nav-numeral").forEach((el) => {
          el.style.color = dimColor;
        });
        nav.querySelectorAll(".hero-dot").forEach((el) => {
          el.style.background = dimColor;
        });
      }

      activeSectionRef.current = activeId;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loaded]);

  // ── Smooth scroll handler ──
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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
            transition: "color 0.4s ease, text-shadow 0.4s ease, -webkit-text-stroke 0.4s ease",
            textShadow: "0 0 10px rgba(240,235,224,0.9), 0 0 40px rgba(240,235,224,0.7), 0 0 80px rgba(240,235,224,0.4), 0 0 120px rgba(240,235,224,0.2)",
            WebkitTextStroke: "0.6px rgba(0,0,0,0.5)",
            paintOrder: "stroke fill",
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
            transition: "color 0.4s ease, text-shadow 0.4s ease, -webkit-text-stroke 0.4s ease",
            textShadow: "0 0 8px rgba(240,235,224,0.8), 0 0 30px rgba(240,235,224,0.6), 0 0 60px rgba(240,235,224,0.3)",
            WebkitTextStroke: "0.4px rgba(0,0,0,0.4)",
            paintOrder: "stroke fill",
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
            onClick={(e) => handleNavClick(e, item.id)}
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
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--cream)",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                textShadow: "0 0 8px rgba(240,235,224,0.8), 0 0 30px rgba(240,235,224,0.6), 0 0 60px rgba(240,235,224,0.3)",
                WebkitTextStroke: "0.4px rgba(0,0,0,0.4)",
                paintOrder: "stroke fill",
                transition: "color 0.4s ease, text-shadow 0.4s ease, letter-spacing 0.4s var(--ease-expo), -webkit-text-stroke 0.4s ease",
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
