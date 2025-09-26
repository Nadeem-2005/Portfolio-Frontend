import Hero from "./Hero";
import PillNav from "./Animations/PillNav/PillNav";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import ContactMe from "./ContactMe";
import Footer from "./Footer";


const Home = () => {
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
                    {
                        href: "https://nadeemresume.blob.core.windows.net/$web/Resume-Mohammed-Nadeem.pdf",
                        label: "Resume",
                    },
                ]}
                activeHref="/"
                baseColor="#000000"              // Dark background for navbar container
                pillColor="#f3f4f6"              // Light gray pill background
                pillTextColor="#000000"          // Dark text
                hoveredPillTextColor="#ffffff"   // White text when hovered
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
};

export default Home;