import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function SkillCard(props) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Hover animations
        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.1,
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
            className="flex flex-col items-center text-center p-4 m-2 rounded-lg transition-all duration-300 hover:bg-gray-800/30 cursor-pointer group"
        >
            <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center">
                <img 
                    src={props.imgURL} 
                    alt={props.name}
                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
            </div>
            <p 
                className="text-lg md:text-xl font-medium text-white transition-all duration-300"
                style={{
                    filter: 'brightness(1)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.filter = 'brightness(1.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = '';
                    e.currentTarget.style.filter = 'brightness(1)';
                }}
            >
                {props.name}
            </p>
        </div>
    );
}

export default SkillCard;