import { useState, useRef, useEffect } from "react";
import Loader from "./Components/Loader";
import CustomCursor from "./Components/CustomCursor";
import GeometricLines from "./Components/GeometricLines";
import HeroFrame from "./Components/HeroFrame";
import HeroVideo from "./Components/HeroVideo";
import CreamExplosion from "./Components/CreamExplosion";

function App() {
  const [loaded, setLoaded] = useState(false);
  const geoRef = useRef(null);
  const heroTextRef = useRef(null);

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
