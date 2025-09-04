import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

function ProjectCard({ 
    title, 
    description, 
    techStack = [], 
    githubUrl, 
    liveUrl, 
    imageUrl,
    imageAlt = "Project screenshot"
}) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;
        const content = contentRef.current;

        if (!card) return;

        // Hover animation for the entire card
        const handleMouseEnter = () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (image) {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            if (content) {
                gsap.to(content, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            if (content) {
                gsap.to(content, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 group cursor-pointer"
        >
            {/* Project Image */}
            {imageUrl && (
                <div className="relative overflow-hidden h-48">
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            )}

            {/* Project Content */}
            <div ref={contentRef} className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 space-grotesk">
                    {title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Tech Stack */}
                {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links */}
                <div className="flex gap-4">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition-colors duration-200"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Code
                        </a>
                    )}
                    
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition-colors duration-200"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15,3 21,3 21,9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;