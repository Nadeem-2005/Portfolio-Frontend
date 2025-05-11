import React from "react";

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
                <ul className="flex flex-row md:flex-row justify-between items-center md:w-md">
                    <li>
                        <a
                            href="/Resume_updated.pdf"
                            download
                            className="hover:text-gray-300"
                            title="Download my Resume"
                        >
                            <img src="/resume.svg" alt="Resume icon" className="w-12 h-12 bg-black" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className="hover:text-gray-300"
                            title="About section"
                            onClick={(e) => smoothScroll(e, "about")}
                        >
                            <img src="/about.svg" alt="about icon" className="w-12 h-12 bg-black" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Skill"
                            className="hover:text-gray-300"
                            title="Skills section"
                            onClick={(e) => smoothScroll(e, "Skill")}
                        >
                            <img src="/skill.svg" alt="skill icon" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Contact"
                            className="hover:text-gray-300"
                            title="Let's Connect"
                            onClick={(e) => smoothScroll(e, "Contact")}
                        >
                            <img src="/email-svgrepo-com.svg" alt="contact me icon" className="w-16" />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;