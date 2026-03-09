import { useState, useRef } from "react";
import Loader from "./Components/Loader";
import CustomCursor from "./Components/CustomCursor";
import GeometricLines from "./Components/GeometricLines";

function App() {
  const [loaded, setLoaded] = useState(false);
  const geoRef = useRef(null);

  return (
    <>
      <GeometricLines ref={geoRef} />
      <CustomCursor />
      {!loaded && (
        <Loader onComplete={() => setLoaded(true)} geoRef={geoRef} />
      )}
      <main className="relative z-[2]">
        {/* Sections will be built here */}
      </main>
    </>
  );
}

export default App;
