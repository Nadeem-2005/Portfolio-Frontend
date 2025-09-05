import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./Animations/ScrollReveal/ScrollReveal";
import ParticleField from "./Animations/ParticleField/ParticleField";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Sample project data - replace with your actual projects
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with user authentication, product management, and payment integration. Built with modern technologies for optimal performance.",
            techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
            githubUrl: "https://github.com/yourusername/ecommerce",
            liveUrl: "https://your-ecommerce-demo.com",
            imageUrl: "/api/placeholder/400/300"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            techStack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
            githubUrl: "https://github.com/yourusername/task-manager",
            liveUrl: "https://your-task-app-demo.com",
            imageUrl: "/api/placeholder/400/300"
        },
        {
            title: "Weather Dashboard",
            description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
            techStack: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
            githubUrl: "https://github.com/yourusername/weather-app",
            liveUrl: "https://your-weather-demo.com",
            imageUrl: "/api/placeholder/400/300"
        },
        {
            title: "Social Media Analytics",
            description: "A comprehensive analytics dashboard for social media metrics with data visualization and automated reporting features.",
            techStack: ["Python", "Django", "PostgreSQL", "D3.js", "AWS"],
            githubUrl: "https://github.com/yourusername/social-analytics",
            imageUrl: "/api/placeholder/400/300"
        },
        {
            title: "Mobile Fitness Tracker",
            description: "iOS application for fitness tracking with workout plans, progress monitoring, and social features for motivation.",
            techStack: ["Swift", "Core Data", "HealthKit", "Firebase"],
            githubUrl: "https://github.com/yourusername/fitness-tracker",
            imageUrl: "/api/placeholder/400/300"
        },
        {
            title: "AI Chat Application",
            description: "Real-time chat application with AI integration, sentiment analysis, and smart response suggestions.",
            techStack: ["Node.js", "Socket.io", "OpenAI API", "React", "Redis"],
            githubUrl: "https://github.com/yourusername/ai-chat",
            liveUrl: "https://your-chat-demo.com",
            imageUrl: "/api/placeholder/400/300"
        }
    ];

    useEffect(() => {
        const cards = cardsRef.current;

        // Animate cards on scroll
        cards.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        y: 0,
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
        <div className="relative min-h-screen text-white p-8 md:p-20" id="Projects">
            {/* Background Animation */}
            <ParticleField
                particleCount={30}
                color="#06b6d4"
                opacity={0.15}
                speed={0.5}
                size={1.5}
            />

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
                    "Code is like art — it's not just about making it work, it's about making it beautiful."
                </ScrollReveal>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                    >
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            techStack={project.techStack}
                            githubUrl={project.githubUrl}
                            liveUrl={project.liveUrl}
                            imageUrl={project.imageUrl}
                            imageAlt={`${project.title} screenshot`}
                        />
                    </div>
                ))}
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
                    "Every project is a step forward in the journey of innovation."
                </ScrollReveal>
            </div>
        </div>
    );
}

export default Projects;