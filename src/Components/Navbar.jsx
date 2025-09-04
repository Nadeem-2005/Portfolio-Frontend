
function smoothScroll(e, targetId) {
    e.preventDefault(); // Prevent the default anchor behavior
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
}

function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-between items-center text-white p-5 m-4 text-4xl tangerine-bold">
                <div className="text-6xl changa mb-4 md:mb-0">
                    <h1>نديم</h1>
                </div>
                <ul className="flex flex-row md:flex-row justify-between items-center gap-2 md:gap-4">
                    <li>
                        <a
                            href="/Resume_updated.pdf"
                            download
                            className="hover:text-gray-300 transition-colors duration-200"
                            title="Download my Resume"
                        >
                            <img src="/resume.svg" alt="Resume icon" className="w-10 h-10 md:w-12 md:h-12" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className="hover:text-cyan-300 transition-colors duration-200"
                            title="About section"
                            onClick={(e) => smoothScroll(e, "about")}
                        >
                            <img src="/about.svg" alt="about icon" className="w-10 h-10 md:w-12 md:h-12" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Skill"
                            className="hover:text-cyan-300 transition-colors duration-200"
                            title="Skills section"
                            onClick={(e) => smoothScroll(e, "Skill")}
                        >
                            <img src="/skill.svg" alt="skill icon" className="w-10 h-10 md:w-12 md:h-12" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Projects"
                            className="hover:text-cyan-300 transition-colors duration-200"
                            title="My Projects"
                            onClick={(e) => smoothScroll(e, "Projects")}
                        >
                            <svg width="40" height="40" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                                <circle cx="7" cy="8" r="1"/>
                                <circle cx="12" cy="8" r="1"/>
                                <circle cx="17" cy="8" r="1"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Experience"
                            className="hover:text-cyan-300 transition-colors duration-200"
                            title="My Experience"
                            onClick={(e) => smoothScroll(e, "Experience")}
                        >
                            <svg width="40" height="40" className="md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                <circle cx="8" cy="11" r="2"/>
                                <path d="M12 11h4"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Contact"
                            className="hover:text-cyan-300 transition-colors duration-200"
                            title="Let's Connect"
                            onClick={(e) => smoothScroll(e, "Contact")}
                        >
                            <img src="/email-svgrepo-com.svg" alt="contact me icon" className="w-12 h-12 md:w-16 md:h-16" />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;