import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import PillNav from "./Components/Animations/PillNav/PillNav";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import ContactMe from "./Components/ContactMe";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <PillNav
        logo={null}  // your logo path
        items={[
          { href: "#about", label: "About" },
          { href: "#Skill", label: "Skills" },
          { href: "#Projects", label: "Projects" },
          { href: "#Experience", label: "Experience" },
          { href: "#Contact", label: "Contact" },
        ]}
        activeHref="/"  // optional, to highlight the active section
        baseColor="transparent"  // navbar background
        pillColor="#f3f4f6"       // pill background
        pillTextColor="#000000"   // text color
        hoveredPillTextColor="#1a1a1a"
        initialLoadAnimation="true"
        ease="power2.easeOut"
      />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
