import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import CustomCursor from "./Components/CustomCursor";
import GeometricLines from "./Components/GeometricLines";
import Home from "./Components/Home";

function App() {
  const [loaded, setLoaded] = useState(false);
  const geoRef = useRef(null);

  return (
    <Router>
      {/* Geometric lines: always mounted, animated by Loader, persist as background */}
      <GeometricLines ref={geoRef} />
      <CustomCursor />
      {!loaded && (
        <Loader onComplete={() => setLoaded(true)} geoRef={geoRef} />
      )}
      {/* z-index 2 creates a stacking context ABOVE the geo lines (z:1 after load) */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
