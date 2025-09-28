import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./Animations/ScrollReveal/ScrollReveal";
import SkillCard from "./SkillCard";
import ScrollFloat from "./Animations/ScrollFloat/ScrollFloat";
import ShinyText from './Animations/ShinyText/ShinyText';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
    const skillSectionsRef = useRef([]);

    useEffect(() => {
        const sections = skillSectionsRef.current;
        const sectionTriggers = [];

        sections.forEach((section) => {
            if (section) {
                const cards = section.querySelectorAll('.skill-card');

                const sectionAnimation = gsap.fromTo(cards,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                sectionTriggers.push(sectionAnimation.scrollTrigger);
            }
        });

        return () => {
            // Only kill ScrollTrigger instances created by this component
            sectionTriggers.forEach(trigger => {
                if (trigger) trigger.kill();
            });
        };
    }, []);

    return (
        <div className="text-white min-h-screen p-8 md:p-20" id="Skill">
            <ScrollReveal
                baseOpacity={1}
                enableBlur={true}
                baseRotation={5}
                blurStrength={15}
                textClassName="text-center"
                wordAnimationEnd="bottom bottom"
            >
                "A skill is not lost when the hands grow weary, nor when the world turns its back. A skill dies only when it is abandoned and forgotten."
            </ScrollReveal>

            {/* Programming Languages */}
            <div className="mt-16 md:mt-20 mb-12">
                <h3
                    className="text-2xl md:text-3xl font-semibold text-white text-center mb-8 space-grotesk"
                    style={{
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.4)'
                    }}
                >
                    Programming Languages
                </h3>
                <div
                    ref={el => skillSectionsRef.current[0] = el}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 max-w-6xl mx-auto"
                >
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/c.svg"} name={"C"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/c++.svg"} name={"C++"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/java.svg"} name={"Java"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/swift.svg"} name={"Swift"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Objective-C.svg"} name={"Objective-C"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/html.svg"} name={"HTML"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/css.svg"} name={"CSS"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/javascript.svg"} name={"JavaScript"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/typescript.svg"} name={"TypeScript"} /></div>
                </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="mb-12">
                <h3
                    className="text-2xl md:text-3xl font-semibold text-white text-center mb-8 space-grotesk"
                    style={{
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.4)'
                    }}
                >
                    Frameworks & Libraries
                </h3>
                <div
                    ref={el => skillSectionsRef.current[1] = el}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 max-w-6xl mx-auto"
                >
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/node-js.svg"} name={"Node.js"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/react.svg"} name={"React.js"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/nextjs.svg"} name={"Next.js"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/express-js.svg"} name={"Express.js"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/ejs.svg"} name={"EJS"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/bootstrap.svg"} name={"Bootstrap"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/tailwind-css.svg"} name={"Tailwind CSS"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/shadcn-ui.svg"} name={"Shadcn UI"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/FrameWorks/unity.svg"} name={"Unity"} /></div>
                </div>
            </div>

            <ScrollFloat
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=40%'
                stagger={0.03}
                containerClassName="text-center my-16"
                textClassName="text-xl md:text-2xl"
            >
                "Tools don't build dreams — but knowing how to use them does."
            </ScrollFloat>

            {/* Tools & Technologies */}
            <div className="mb-16">
                <h3
                    className="text-2xl md:text-3xl font-semibold text-white text-center mb-8 space-grotesk"
                    style={{
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.4)'
                    }}
                >
                    Tools & Technologies
                </h3>
                <div
                    ref={el => skillSectionsRef.current[2] = el}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 max-w-6xl mx-auto"
                >
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/aws.svg"} name={"AWS"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/azure.svg"} name={"Azure"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/bash.svg"} name={"Bash"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/firebase.svg"} name={"Firebase"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/github.svg"} name={"GitHub"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/git.svg"} name={"Git"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/unix.svg"} name={"Unix Shell"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/vs-code.svg"} name={"VS Code"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/xcode.svg"} name={"Xcode"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/vercel.svg"} name={"Vercel"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/pycharm.svg"} name={"PyCharm"} /></div>
                    <div className="skill-card"><SkillCard imgURL={"/SkillIcons/Tools/unityhub.svg"} name={"Unity Hub"} /></div>
                </div>
            </div>

            <div className="text-center">
                <a
                    href="https://icons8.com/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                >
                    <ShinyText
                        text="Icons from Icons8"
                        disabled={false}
                        speed={3}
                        className="text-sm text-blue-400 underline"
                    />
                </a>
            </div>
        </div>
    )
}

export default Skills;