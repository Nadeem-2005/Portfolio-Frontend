import { useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import Project from "./components/Projects";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div >
      <Navbar />
      <Hero />
      <Skills />
      <Project />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
