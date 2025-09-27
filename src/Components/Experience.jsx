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
            company: "Verizon",
            role: "Incoming Software Developer Intern",
            duration: "2025 - Upcoming",
            location: "Chennai, India",
            description: "Will be contributing to large-scale enterprise projects, enhancing full stack applications, and collaborating with cross-functional teams to deliver scalable solutions.",
            achievements: [
                "Selected as an incoming developer at Verizon",
                "Will gain exposure to telecom-grade software systems",
                "Will work on projects involving large-scale distributed systems"
            ],
            technologies: ["React", "Node.js", "Java", "Cloud Technologies"],
            languages: ["JavaScript", "TypeScript", "Java", "SQL"]
        },
        {
            company: "Adappt Mobile Cloud Applications Pvt Ltd",
            role: "Software Developer Intern",
            duration: "May 2025 - June 2025",
            location: "Pondicherry, India",
            description: "Contributed to enterprise-level healthcare management systems, optimizing performance and deployment pipelines.",
            achievements: [
                "Implemented Redis caching and background job processing",
                "Delivered measurable performance improvements in production",
                "Gained hands-on experience with scalable architecture and code review processes"
            ],
            technologies: ["Redis", "Node.js", "React", "PostgreSQL", "Real-time Communication"],
            languages: ["JavaScript", "TypeScript", "SQL"]
        },
        {
            company: "Freelance / Personal Projects",
            role: "Full Stack & iOS Developer",
            duration: "2023 - Present",
            location: "Remote",
            description: "Developed multiple full stack and mobile applications, focusing on healthcare, video conferencing, and climate monitoring solutions.",
            achievements: [
                "Built CliniCall, a production-grade healthcare platform with Redis caching and BullMQ job queues",
                "Created Connect+, a video conferencing web app with Clerk Auth, Firebase, and Stream SDK",
                "Developed The Climate, an iOS app with Core Location and OpenWeather API achieving 92%+ data accuracy"
            ],
            technologies: ["Next.js", "React", "Node.js", "Firebase", "Prisma", "Swift-Core Location", "Tailwind CSS"],
            languages: ["JavaScript", "TypeScript", "Swift", "Objective-C", "SQL"]
        },
    ];

    useEffect(() => {
        const timeline = timelineRef.current;
        const cards = cardsRef.current;
        const componentTriggers = [];

        // Animate timeline line
        if (timeline) {
            const timelineAnimation = gsap.fromTo(timeline,
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
            componentTriggers.push(timelineAnimation.scrollTrigger);
        }

        // Animate experience cards
        cards.forEach((card, index) => {
            if (card) {
                const isLeft = index % 2 === 0;
                const cardAnimation = gsap.fromTo(card,
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
                componentTriggers.push(cardAnimation.scrollTrigger);
            }
        });

        return () => {
            // Only kill ScrollTrigger instances created by this component
            componentTriggers.forEach(trigger => {
                if (trigger) trigger.kill();
            });
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
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white via-gray-100 to-white hidden md:block"
                    style={{
                        height: '100%',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)'
                    }}
                >
                    <div className="absolute inset-0 bg-white blur-md opacity-80" />
                    <div className="absolute -inset-2 bg-white blur-xl opacity-40" />
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
                                        languages={experience.languages}
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