import Home from "./Components/Home";
import Dummy from "./Components/About-me-Detailed/About-me-Detailed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me-detailed" element={<Dummy />} />
      </Routes>
    </Router>
  );
}

export default App;
