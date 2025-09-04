import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "./ExperienceCard";
import ScrollReveal from "./Animations/ScrollReveal/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
    const timelineRef = useRef(null);
    const cardsRef = useRef([]);

    // Sample experience data - replace with your actual experience
    const experiences = [
        {
            company: "Tech Innovations Corp",
            role: "Senior Full Stack Developer",
            duration: "2023 - Present",
            location: "San Francisco, CA",
            description: "Leading development of scalable web applications and mentoring junior developers in modern frameworks and best practices.",
            achievements: [
                "Architected microservices reducing system response time by 40%",
                "Led a team of 5 developers on critical client projects",
                "Implemented CI/CD pipeline improving deployment efficiency by 60%"
            ],
            technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"]
        },
        {
            company: "Digital Solutions LLC",
            role: "Full Stack Developer",
            duration: "2021 - 2023",
            location: "Remote",
            description: "Developed and maintained multiple client applications using modern web technologies and cloud services.",
            achievements: [
                "Built 15+ responsive web applications from concept to deployment",
                "Reduced application load times by 50% through optimization",
                "Collaborated with UX/UI teams to improve user experience"
            ],
            technologies: ["JavaScript", "Python", "Express", "Firebase", "Tailwind CSS"]
        },
        {
            company: "StartupXYZ",
            role: "Frontend Developer",
            duration: "2020 - 2021",
            location: "New York, NY",
            description: "Focused on creating intuitive user interfaces and implementing responsive designs for various client projects.",
            achievements: [
                "Developed mobile-first responsive designs for 20+ projects",
                "Implemented modern JavaScript frameworks and libraries",
                "Improved website performance scores by average of 35%"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"]
        },
        {
            company: "Freelance",
            role: "Web Developer",
            duration: "2019 - 2020",
            location: "Remote",
            description: "Provided web development services to small businesses and startups, creating custom solutions tailored to their needs.",
            achievements: [
                "Successfully delivered 25+ projects on time and within budget",
                "Maintained 98% client satisfaction rate",
                "Established long-term partnerships with 8 recurring clients"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"]
        }
    ];

    useEffect(() => {
        const timeline = timelineRef.current;
        const cards = cardsRef.current;

        // Animate timeline line
        if (timeline) {
            gsap.fromTo(timeline, 
                {
                    scaleY: 0,
                    transformOrigin: "top center"
                },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: timeline,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1
                    }
                }
            );
        }

        // Animate experience cards
        cards.forEach((card, index) => {
            if (card) {
                const isLeft = index % 2 === 0;
                gsap.fromTo(card, 
                    {
                        x: isLeft ? -100 : 100,
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        },
                        delay: index * 0.1
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="relative min-h-screen text-white p-8 md:p-20" id="Experience">
            {/* Section Header */}
            <div className="text-center mb-16">
                <ScrollReveal
                    baseOpacity={1}
                    enableBlur={true}
                    baseRotation={3}
                    blurStrength={10}
                    textClassName="text-center"
                    wordAnimationEnd="bottom bottom"
                >
                    "Experience is the teacher of all things — and code is no exception."
                </ScrollReveal>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto">
                {/* Timeline Line */}
                <div 
                    ref={timelineRef}
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 hidden md:block"
                    style={{ height: '100%' }}
                >
                    <div className="absolute inset-0 bg-cyan-300 blur-sm opacity-50" />
                </div>

                {/* Experience Cards */}
                <div className="space-y-12 md:space-y-16">
                    {experiences.map((experience, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div 
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                <div className={`w-full ${isLeft ? 'md:w-5/12' : 'md:w-5/12'}`}>
                                    <ExperienceCard
                                        company={experience.company}
                                        role={experience.role}
                                        duration={experience.duration}
                                        location={experience.location}
                                        description={experience.description}
                                        achievements={experience.achievements}
                                        technologies={experience.technologies}
                                        isLeft={isLeft}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-20 text-center">
                <ScrollReveal
                    baseOpacity={0.8}
                    enableBlur={false}
                    baseRotation={1}
                    textClassName="text-center"
                    wordAnimationEnd="bottom bottom"
                >
                    "Every challenge faced is a skill earned, every problem solved is wisdom gained."
                </ScrollReveal>
            </div>
        </div>
    );
}

export default Experience;