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
            <h2>Engineer who appreciates the craft.</h2>
            <p>
              I build thoughtful digital experiences where engineering precision
              meets creative intent. Every detail is considered, every interaction
              intentional.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
