import { useState, useRef, useEffect } from "react";
import Loader from "./Components/Loader";
import CustomCursor from "./Components/CustomCursor";
import GeometricLines from "./Components/GeometricLines";
import HeroFrame from "./Components/HeroFrame";
import HeroVideo from "./Components/HeroVideo";
import CreamExplosion from "./Components/CreamExplosion";

const MOBILE_BP = 768;

function MobileGate() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        zIndex: 999999,
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--gold)",
          marginBottom: "2.5rem",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
          color: "var(--cream)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          marginBottom: "1.2rem",
        }}
      >
        This experience was
        <br />
        crafted for larger screens.
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "var(--cream-dim)",
          lineHeight: 1.6,
          maxWidth: "280px",
          marginBottom: "2.5rem",
        }}
      >
        Please revisit on a desktop or laptop
        for the full experience.
      </p>

      {/* Decorative line */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--gold)",
          marginBottom: "2rem",
          opacity: 0.6,
        }}
      />

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--cream-dim)",
          opacity: 0.5,
        }}
      >
        nadeem.dev
      </span>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const geoRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <MobileGate />;

  return (
    <>
      <HeroVideo loaded={loaded} />
      <CreamExplosion loaded={loaded} />
      <GeometricLines ref={geoRef} />
      <CustomCursor />
      {!loaded && (
        <Loader
          onComplete={() => setLoaded(true)}
          geoRef={geoRef}
          heroTextRef={heroTextRef}
        />
      )}
      <HeroFrame ref={heroTextRef} loaded={loaded} geoRef={geoRef} />
      <main className="relative z-[5]" style={{ background: "transparent" }}>
        {/* Hero scroll zone — video + explosion play out over this distance */}
        <div style={{ height: "200vh" }} />

        {/* Sections — offset right to clear the fixed nav sidebar */}
        <div
          className="sections-content"
          style={{
            paddingLeft: "calc(4% + 260px + 3rem)",
            paddingRight: "6vw",
          }}
        >
          {/* About section — revealed after cream explosion covers the screen */}
          <section id="about" className="section section--cream">
            <span className="section-label">About</span>
            <h2>I build what you don't see — and obsess over how it feels.</h2>
            <p>
              Backend engineer by trade, currently wrapping up my final year and
              transitioning into a full-time engineering role this summer. I'm drawn
              to the invisible architecture — the systems, APIs, and logic layers
              that make products feel effortless. But I care just as much about
              what's on the surface.
            </p>
            <p>
              Away from the editor, I'm on the badminton court chasing every point,
              digging into film and cinematography, or lost in a playlist that
              somehow ends up shaping how I think about rhythm in code. I'm
              endlessly curious — always picking up something new, always looking
              for the next thing to get good at.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
