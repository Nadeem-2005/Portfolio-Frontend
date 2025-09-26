import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../Animations/ScrollReveal/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const AboutMeDetailed = () => {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);
    const backButtonRef = useRef(null);
    const heroRef = useRef(null);

    const academicData = {
        education: [
            {
                institution: "Vellore Institute of Technology",
                degree: "Bachelor of Technology in Computer Science and Engineering",
                duration: "2022 - 2026",
                gpa: "9.15/10",
                achievements: [
                    "Maintained a GPA of 9+ across all the semesters",
                    "Top 10% of graduating class",
                    "Outstanding Student in Data Structures & Algorithms"
                ],
                location: "Vellore, India"
            }
        ]
    };

    const certificationsData = [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2024",
            description: "Cloud development and deployment expertise",
            ValidationLink: "https://aws.amazon.com/verification/387b521ad1ae44098b7a6a62365c17ad"
        },
        {
            title: "Azure: AI Fundamentals (AI-900)",
            issuer: "Microsoft",
            date: "2025",
            description: "Learnt Microsoft Azure AI services and concepts",
            ValidationLink: "https://www.credly.com/badges/45af566e-63bf-40f7-89c1-1fe10104b298/public_url"
        },
        {
            title: "Introduction to MCP",
            issuer: "Anthropic INC.",
            date: "2025",
            description: "Learnt Basics of Model-Context-Protocol",
            ValidationLink: "https://cc.sj-cdn.net/certificate/47ajyxsragmw/certificate-5ijxo2rpmz5o-1757266456.pdf?response-content-disposition=attachment&Expires=1758826442&Signature=s~GHIu0mg8Fngzth2qQPWydftmuWnIpB0A7QRXs1FFr7lX0zm1hukZPdWE75Xi1wopwUxKoo6pw-ev5aZ-3le36gexaMt0U~sBNi4Ctxm-m5w10s6jC57iO1eSBfFv5xgG1zgRjQqLMMaEx8wPSz2PEByGyd4Z6C1MqtCS0Gih4GcnSd6WgeDij~2hgn7~ypt6CjbIz7X4zg~YjCegX6KYUzBl~xi3sQHSjgtcIlQJquSyFGIhzYRl2~a58VnlQU7kD0ShfkKm3gJAfu7cle4GR-oRtI5pcbeSf7yCHzl1P4r4vi0g8KFmsC8pXsSQ8dc3eVCKYvsozJjsgbn80seQ__&Key-Pair-Id=APKAI3B7HFD2VYJQK4MQ"
        }
    ];

    const extracurricularData = [
        {
            activity: "ISTE Student Chapter",
            role: "Junior Core Member",
            duration: "2022 - 2023",
            description: "Helped in conducting technical workshops and organized coding competitions for 200+ students",
            achievements: [
                "Helped in organizing an annual hackathon with 500+ participants",
                "Increased club membership by pitching to juniors",
            ]
        },
        {
            activity: "Volunteer Coding Instructor",
            role: "Instructor",
            duration: "2022 - Present",
            description: "Teaching programming fundamentals to underprivileged students",
            achievements: [
                "Taught 50+ students basic programming",
                "100% student satisfaction rate",
                "Developed custom curriculum for beginners"
            ]
        },
        {
            activity: "University Football Team",
            role: "Team Member",
            duration: "2021 - 2023",
            description: "Balanced athletics with academics, developing teamwork and discipline",
            achievements: [
                "Regional championship finalist",
                "Team captain for 2023 season",
                "Perfect attendance for 2 years"
            ]
        }
    ];

    const researchData = [
        {
            title: "Database Security: Access Control Models and Implementation",
            duration: "2024 - 2025",
            supervisor: "Course Faculty - BCSE323L",
            description: "Comprehensive analysis and review of database security research focusing on discretionary and mandatory access control models, polyinstantiation, and multilevel security frameworks",
            technologies: ["Database Security", "Access Control Models", "Bell-LaPadula Model", "System R Authorization", "Security Analysis"],
            status: "Academic Research Review",
            achievements: [
                "Analyzed cutting-edge access control mechanisms for database systems",
                "Evaluated Discretionary Access Control (DAC) and Mandatory Access Control (MAC) models",
                "Reviewed polyinstantiation techniques for multilevel security databases",
                "Identified future research directions in role-based access control"
            ]
        },
        {
            title: "Robust Digital Watermarking using DWT-SVD Hybrid Approach",
            duration: "2024 - 2025",
            supervisor: "Course Faculty - BCSE323L",
            description: "Developed and implemented a robust digital watermarking system combining Discrete Wavelet Transform and Singular Value Decomposition for copyright protection in digital images",
            technologies: ["MATLAB", "Discrete Wavelet Transform", "Singular Value Decomposition", "Image Processing", "Digital Signal Processing"],
            status: "Implementation Complete",
            achievements: [
                "Achieved PSNR values of 69.20 dB for watermarked images without attacks",
                "Demonstrated robustness against Gaussian noise (40.74 dB PSNR after attack)",
                "Successfully embedded dual watermarks in HL and LH subbands",
                "Maintained high correlation coefficients (close to 1.0) for watermark extraction",
                "Implemented comprehensive attack simulation including noise, blur, and compression"
            ]
        },
        {
            title: "Advanced Steganography Implementation using DWT Domain",
            duration: "2024 - 2025",
            supervisor: "Course Faculty - BCSE323L",
            description: "Implemented steganographic techniques in both LL and HH domains of DWT for secure message embedding with comparative analysis of domain robustness",
            technologies: ["MATLAB", "Steganography", "Discrete Wavelet Transform", "Image Processing", "Security Analysis"],
            status: "Research Implementation",
            achievements: [
                "Successfully embedded text messages in wavelet transform coefficients",
                "Implemented extraction algorithms for both LL and HH domains",
                "Conducted comprehensive attack analysis on 10+ different attack vectors",
                "Evaluated robustness using PSNR, SNR, and SSIM metrics",
                "Compared domain-specific vulnerabilities and strengths"
            ]
        }
    ];

    const leadershipData = [
        {
            position: "Student Coordinator - GraVITas 2024",
            organization: "Guest Care Committee, VIT",
            duration: "2024",
            description: "Coordinated guest management and documentation for GraVITas, VIT's annual international tech fest",
            responsibilities: [
                "Handled documentation and records of 1000+ guests and participants",
                "Coordinated with volunteers to manage guest accommodations and event logistics",
                "Assisted foreign and national participants ensuring smooth onboarding",
                "Collaborated with event teams to streamline escort and dorm allocation processes"
            ],
            achievements: [
                "Successfully managed guest records with 100% accuracy",
                "Ensured seamless hospitality for all participants",
                "Recognized for efficient handling of documentation and logistics"
            ]
        },
        {
            position: "Student Coordinator - Riviera 2025",
            organization: "Guest Care Committee, VIT",
            duration: "2025",
            description: "Organized guest hospitality and documentation for Riviera, VIT's annual cultural fest",
            responsibilities: [
                "Maintained detailed Excel records of 1500+ external participants",
                "Coordinated accommodation, escorts, and event schedules with volunteers",
                "Assisted in verifying proofs, receipts, and documentation for participants",
                "Supported coordinators in handling foreign participants and special guests"
            ],
            achievements: [
                "Achieved smooth coordination of 1500+ external participants",
                "Streamlined documentation process for faster onboarding",
                "Praised by Organizers for maintaining accurate and organized records"
            ]
        }
    ];

    const interestsData = {
        professional: [
            "Artificial Intelligence & Machine Learning",
            "Cloud Computing & DevOps",
            "Mobile App Development (iOS)",
            "Blockchain Technology",
            "Cybersecurity",
            "Data Science & Analytics"
        ],
        personal: [
            "Competitive Sports (Football, Basketball)",
            "Gaming & Game Development",
            "Photography & Video Editing",
            "Traveling & Cultural Exploration",
            "Reading Tech Blogs & Research Papers",
            "Community Volunteering"
        ],
        currentlyLearning: [
            "Swift & iOS Development",
            "Docker & Kubernetes",
            "Microservices Architecture",
            "System Design Patterns"
        ]
    };

    const handleBackClick = () => {
        navigate("/");
    };

    useEffect(() => {
        // Hero section animation
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 0);

        if (heroRef.current) {
            gsap.fromTo(heroRef.current.children,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );
        }

        // Back button animation
        if (backButtonRef.current) {
            gsap.fromTo(backButtonRef.current,
                {
                    x: -50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3
                }
            );
        }

        // Section animations
        sectionsRef.current.forEach((section, index) => {
            if (section) {
                const cards = section.querySelectorAll('.detail-card');

                gsap.fromTo(cards,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const DetailCard = ({ children, className = "" }) => {
        const cardRef = useRef(null);

        useEffect(() => {
            const card = cardRef.current;
            if (!card) return;

            const handleMouseEnter = () => {
                gsap.to(card, {
                    scale: 1.02,
                    y: -8,
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
                className={`detail-card relative backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-white/70 ${className}`}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 70px rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="relative bg-black text-white min-h-screen space-grotesk">
            {/* Back Button */}
            <div className="fixed top-8 left-8 z-50">
                <button
                    ref={backButtonRef}
                    onClick={handleBackClick}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/60 hover:scale-105"
                    style={{
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Back to Home
                </button>
            </div>

            {/* Hero Section */}
            <div ref={heroRef} className="pt-32 pb-20 px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)'
                }}>
                    About Me
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    A comprehensive look into my academic journey, professional growth, and the experiences that have shaped me as a developer and leader.
                </p>
            </div>

            {/* Academic Summary */}
            <section ref={el => sectionsRef.current[0] = el} className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal
                        baseOpacity={1}
                        enableBlur={true}
                        baseRotation={2}
                        blurStrength={8}
                        textClassName="text-center mb-16"
                        wordAnimationEnd="bottom bottom"
                    >
                        "Education is the foundation upon which we build our dreams."
                    </ScrollReveal>

                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Academic Summary
                    </h2>

                    <div className="grid gap-8">
                        {academicData.education.map((edu, index) => (
                            <DetailCard key={index}>
                                <div className="mb-6">
                                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xl text-white font-medium mb-2" style={{
                                        textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                                    }}>
                                        {edu.institution}
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {edu.duration}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            {edu.location}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                            GPA: {edu.gpa}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                                        {edu.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </DetailCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section ref={el => sectionsRef.current[1] = el} className="py-20 px-8 bg-black/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Certifications
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificationsData.map((cert, index) => (
                            <DetailCard key={index}>
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-white font-medium mb-1" style={{
                                        textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                                    }}>
                                        {cert.issuer}
                                    </p>
                                    <p className="text-gray-400 text-sm mb-2">{cert.date}</p>
                                </div>

                                <p className="text-gray-300 mb-3">{cert.description}</p>

                                <div className="text-xs text-gray-500">
                                    <a href={cert.ValidationLink} target="new">Validation Link</a>
                                </div>
                            </DetailCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extra Curricular Activities */}
            <section ref={el => sectionsRef.current[2] = el} className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal
                        baseOpacity={1}
                        enableBlur={true}
                        baseRotation={-2}
                        blurStrength={6}
                        textClassName="text-center mb-16"
                        wordAnimationEnd="bottom bottom"
                    >
                        "Leadership is not about being in charge. It's about taking care of those in your charge."
                    </ScrollReveal>

                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Extra Curricular Activities
                    </h2>

                    <div className="grid gap-8">
                        {extracurricularData.map((activity, index) => (
                            <DetailCard key={index}>
                                <div className="mb-4">
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        {activity.activity}
                                    </h3>
                                    <p className="text-lg text-white font-medium mb-1" style={{
                                        textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                                    }}>
                                        {activity.role}
                                    </p>
                                    <p className="text-gray-400">{activity.duration}</p>
                                </div>

                                <p className="text-gray-300 mb-4">{activity.description}</p>

                                <div>
                                    <h4 className="text-white font-medium mb-2">Key Achievements:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                        {activity.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </DetailCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research */}
            <section ref={el => sectionsRef.current[3] = el} className="py-20 px-8 bg-black/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Research Projects
                    </h2>

                    <div className="grid gap-8">
                        {researchData.map((research, index) => (
                            <DetailCard key={index}>
                                <div className="mb-4">
                                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                        {research.title}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-400 text-sm mb-2">
                                        <span>{research.duration}</span>
                                        <span>Supervisor: {research.supervisor}</span>
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-xs font-medium border border-green-700/50">
                                        {research.status}
                                    </span>
                                </div>

                                <p className="text-gray-300 mb-4">{research.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-white font-medium mb-2">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {research.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-white/20 text-white rounded text-xs border border-white/30"
                                                style={{
                                                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white font-medium mb-2">Key Results:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                        {research.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </DetailCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Roles */}
            <section ref={el => sectionsRef.current[4] = el} className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal
                        baseOpacity={1}
                        enableBlur={true}
                        baseRotation={3}
                        blurStrength={10}
                        textClassName="text-center mb-16"
                        wordAnimationEnd="bottom bottom"
                    >
                        "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things."
                    </ScrollReveal>

                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Leadership Roles
                    </h2>

                    <div className="grid gap-8">
                        {leadershipData.map((leadership, index) => (
                            <DetailCard key={index}>
                                <div className="mb-4">
                                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                        {leadership.position}
                                    </h3>
                                    <p className="text-lg text-white font-medium mb-1" style={{
                                        textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                                    }}>
                                        {leadership.organization}
                                    </p>
                                    <p className="text-gray-400">{leadership.duration}</p>
                                </div>

                                <p className="text-gray-300 mb-4">{leadership.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-white font-medium mb-2">Key Responsibilities:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                        {leadership.responsibilities.map((responsibility, idx) => (
                                            <li key={idx}>{responsibility}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-medium mb-2">Achievements:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                        {leadership.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </DetailCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Areas of Interest */}
            <section ref={el => sectionsRef.current[5] = el} className="py-20 px-8 bg-black/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 space-grotesk" style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}>
                        Areas of Interest
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Professional Interests */}
                        <DetailCard>
                            <h3 className="text-xl font-semibold text-white mb-4" style={{
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                            }}>
                                Professional Interests
                            </h3>
                            <div className="space-y-2">
                                {interestsData.professional.map((interest, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full" style={{
                                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                                        }} />
                                        <span className="text-gray-300">{interest}</span>
                                    </div>
                                ))}
                            </div>
                        </DetailCard>

                        {/* Personal Interests */}
                        <DetailCard>
                            <h3 className="text-xl font-semibold text-white mb-4" style={{
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                            }}>
                                Personal Interests
                            </h3>
                            <div className="space-y-2">
                                {interestsData.personal.map((interest, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full" style={{
                                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                                        }} />
                                        <span className="text-gray-300">{interest}</span>
                                    </div>
                                ))}
                            </div>
                        </DetailCard>

                        {/* Currently Learning */}
                        <DetailCard>
                            <h3 className="text-xl font-semibold text-white mb-4" style={{
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                            }}>
                                Currently Learning
                            </h3>
                            <div className="space-y-2">
                                {interestsData.currentlyLearning.map((interest, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{
                                            boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)'
                                        }} />
                                        <span className="text-gray-300">{interest}</span>
                                    </div>
                                ))}
                            </div>
                        </DetailCard>
                    </div>
                </div>
            </section>

            {/* Closing Quote */}
            <section className="py-20 px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal
                        baseOpacity={0.8}
                        enableBlur={false}
                        baseRotation={1}
                        textClassName="text-center"
                        wordAnimationEnd="bottom bottom"
                    >
                        "The journey of a thousand miles begins with one step, and every step forward is a step toward achieving something bigger than yourself."
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default AboutMeDetailed;