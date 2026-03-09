import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Identity from "./Identity";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import ContactMe from "./ContactMe";
import Footer from "./Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ color: "var(--cream)" }}>
      <Navbar visible={true} />
      <Hero />
      <Identity />
      <Skills />
      <Projects />
      <Experience />
      <ContactMe />
      <Footer />
    </div>
  );
}
