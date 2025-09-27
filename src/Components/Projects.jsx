import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./Animations/ScrollReveal/ScrollReveal";
import ParticleField from "./Animations/ParticleField/ParticleField";
import githubService from "../services/githubService";
import { featuredRepositories, githubUsername, maxRepositories, repositoryConfig } from "../config/featuredRepositories";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
    const cardsRef = useRef([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const username = import.meta.env.VITE_GITHUB_USERNAME || githubUsername;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch specific featured repositories
                const repositories = await githubService.fetchFeaturedRepositories(
                    username,
                    featuredRepositories.slice(0, maxRepositories),
                    repositoryConfig.fallbackToRecent
                );

                setProjects(repositories);
            } catch (err) {
                console.error('Failed to fetch GitHub repositories:', err);
                setError('Failed to load projects. Please try again later.');

                // Fallback to placeholder data only if no repositories were found
                if (repositoryConfig.fallbackToRecent) {
                    try {
                        // Last resort: try to fetch recent repositories
                        const fallbackRepos = await githubService.fetchRepositories(username, maxRepositories);
                        setProjects(fallbackRepos);
                        setError(null); // Clear error if fallback succeeds
                    } catch (fallbackErr) {
                        console.error('Fallback also failed:', fallbackErr);
                        // Only show placeholder data if everything fails
                        setProjects([
                            {
                                id: 'placeholder-1',
                                title: "Portfolio Website",
                                description: "A modern, responsive portfolio website built with React and advanced animations.",
                                techStack: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
                                githubUrl: `https://github.com/${username}`,
                                imageUrl: "/api/placeholder/400/300"
                            },
                            {
                                id: 'placeholder-2',
                                title: "Web Development Projects",
                                description: "Collection of web development projects showcasing various technologies and frameworks.",
                                techStack: ["JavaScript", "React", "Node.js", "CSS3"],
                                githubUrl: `https://github.com/${username}`,
                                imageUrl: "/api/placeholder/400/300"
                            }
                        ]);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [username]);

    useEffect(() => {
        if (loading || projects.length === 0) return;

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
    }, [loading, projects]);

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

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center py-12">
                    <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={project.id || index}
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
            )}

            {/* No Projects State */}
            {!loading && !error && projects.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">No projects found</div>
                </div>
            )}

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