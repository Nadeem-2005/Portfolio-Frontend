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

                // Validate environment first
                try {
                    githubService.validateEnvironment();
                } catch (validationError) {
                    console.warn('Environment validation warning:', validationError.message);
                    // Continue anyway - might work with fallbacks
                }

                // Fetch specific featured repositories
                const repositories = await githubService.fetchFeaturedRepositories(
                    username,
                    featuredRepositories.slice(0, maxRepositories),
                    repositoryConfig.fallbackToRecent
                );

                setProjects(repositories);
            } catch (err) {
                console.error('Failed to fetch GitHub repositories:', err);

                // Enhanced error messages based on error type
                let errorMessage = 'Failed to load projects. Please try again later.';

                if (err.message.includes('token is invalid')) {
                    errorMessage = 'GitHub token is invalid. Please check the configuration.';
                } else if (err.message.includes('rate limit')) {
                    errorMessage = 'GitHub API rate limit exceeded. Please try again in a few minutes.';
                } else if (err.message.includes('not found')) {
                    errorMessage = 'Some repositories were not found. Showing available projects.';
                } else if (err.message.includes('Network error')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                }

                setError(errorMessage);

                // Enhanced fallback mechanism
                if (repositoryConfig.fallbackToRecent) {
                    try {
                        console.log('Attempting fallback to recent repositories...');
                        const fallbackRepos = await githubService.fetchRepositories(username, maxRepositories);

                        if (fallbackRepos && fallbackRepos.length > 0) {
                            setProjects(fallbackRepos);
                            setError(null); // Clear error if fallback succeeds
                            console.log(`Fallback successful: loaded ${fallbackRepos.length} repositories`);
                        } else {
                            throw new Error('No repositories found in fallback');
                        }
                    } catch (fallbackErr) {
                        console.error('Fallback also failed:', fallbackErr);

                        // Enhanced placeholder data with better variety
                        const placeholderProjects = [
                            {
                                id: 'placeholder-1',
                                title: "Portfolio Website",
                                description: "A modern, responsive portfolio website built with React and advanced animations using GSAP and Tailwind CSS.",
                                techStack: ["React", "Tailwind CSS", "GSAP", "JavaScript"],
                                githubUrl: `https://github.com/${username}`,
                                imageUrl: "https://ui-avatars.com/api/?name=Portfolio+Website&size=400&background=0ea5e9&color=fff&bold=true&format=png"
                            },
                            {
                                id: 'placeholder-2',
                                title: "Full Stack Web Application",
                                description: "A complete web application demonstrating modern full-stack development practices with React frontend and Node.js backend.",
                                techStack: ["React", "Node.js", "Express", "MongoDB"],
                                githubUrl: `https://github.com/${username}`,
                                imageUrl: "https://ui-avatars.com/api/?name=Full+Stack+App&size=400&background=10b981&color=fff&bold=true&format=png"
                            },
                            {
                                id: 'placeholder-3',
                                title: "API Development Project",
                                description: "RESTful API development project showcasing backend development skills with proper authentication and data validation.",
                                techStack: ["Node.js", "Express", "JWT", "PostgreSQL"],
                                githubUrl: `https://github.com/${username}`,
                                imageUrl: "https://ui-avatars.com/api/?name=API+Project&size=400&background=f59e0b&color=fff&bold=true&format=png"
                            }
                        ];

                        setProjects(placeholderProjects.slice(0, maxRepositories));
                        setError('Unable to load GitHub projects. Showing sample projects.');
                    }
                } else {
                    // If fallback is disabled, still provide some placeholder content
                    setProjects([]);
                    setError('Unable to load projects. Please check your network connection.');
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
        const cardTriggers = [];

        // Animate cards on scroll
        cards.forEach((card, index) => {
            if (card) {
                const animation = gsap.fromTo(card,
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
                cardTriggers.push(animation.scrollTrigger);
            }
        });

        return () => {
            // Only kill ScrollTrigger instances for our cards
            cardTriggers.forEach(trigger => {
                if (trigger) trigger.kill();
            });
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
                    {!error.includes('sample projects') && !error.includes('Unable to load GitHub projects') && (
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setError(null);
                                    window.location.reload();
                                }}
                                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                            >
                                Retry
                            </button>
                            <button
                                onClick={() => {
                                    setError(null);
                                    setProjects([]);
                                }}
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                    {(error.includes('sample projects') || error.includes('Unable to load GitHub projects')) && (
                        <div className="text-gray-400 text-sm mt-2">
                            Showing placeholder content. Check your network connection or GitHub token configuration.
                        </div>
                    )}
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