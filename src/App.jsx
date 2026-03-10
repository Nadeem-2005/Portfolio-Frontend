import { useState, useRef } from "react";
import Loader from "./Components/Loader";
import CustomCursor from "./Components/CustomCursor";
import GeometricLines from "./Components/GeometricLines";
import HeroFrame from "./Components/HeroFrame";

function App() {
  const [loaded, setLoaded] = useState(false);
  const geoRef = useRef(null);
  const heroTextRef = useRef(null);

  return (
    <>
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
      <main className="relative z-[2]">
        {/* Scroll spacer — will be replaced by actual sections */}
        <div style={{ height: "200vh" }} />
      </main>
    </>
  );
}

export default App;
