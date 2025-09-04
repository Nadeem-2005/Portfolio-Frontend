import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function ExperienceCard({ 
    company, 
    role, 
    duration, 
    location,
    description, 
    achievements = [],
    technologies = [],
    isLeft = false
}) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Hover animations
        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.02,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
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
            className={`relative bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 ${
                isLeft ? 'md:mr-8 lg:mr-16' : 'md:ml-8 lg:ml-16'
            }`}
        >
            {/* Timeline Connector */}
            <div className={`hidden md:block absolute top-8 w-4 h-4 bg-cyan-500 rounded-full ${
                isLeft ? '-right-2' : '-left-2'
            }`}>
                <div className="absolute inset-1 bg-cyan-300 rounded-full animate-pulse" />
            </div>

            {/* Company & Role */}
            <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white space-grotesk mb-2">
                    {role}
                </h3>
                <p className="text-cyan-300 font-medium text-lg mb-1">
                    {company}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {duration}
                    </span>
                    {location && (
                        <span className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {location}
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            {description && (
                <p className="text-gray-300 mb-4 leading-relaxed">
                    {description}
                </p>
            )}

            {/* Key Achievements */}
            {achievements.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        {achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Technologies */}
            {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs border border-cyan-500/30"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExperienceCard;