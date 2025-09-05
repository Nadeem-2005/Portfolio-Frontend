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
        logo={null}
        name="نديم"
        items={[
          { href: "#about", label: "About" },
          { href: "#Skill", label: "Skills" },
          { href: "#Projects", label: "Projects" },
          { href: "#Experience", label: "Experience" },
          { href: "#Contact", label: "Contact" },
        ]}
        activeHref="/"
        baseColor="#000000"              // Dark background for navbar
        pillColor="#f3f4f6"             // Light gray pill background (default state)
        pillTextColor="#000000"         // Dark text (default state)
        hoveredPillTextColor="#ffffff"  // White text when hovered
        initialLoadAnimation={true}
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
