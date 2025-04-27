import { useState } from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Skills from "./Components/Skills";
import ContactMe from "./Components/ContactMe";
import Footer from "./Components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div >
      <Navbar />
      <Hero />
      <Skills />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
