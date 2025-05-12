import React from "react";

function ProjectCard(props) {
    return (
        <div className="rounded-xl bg-white/30 backdrop-blur-md p-4 text-white grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 md:p-10">
            {/* Image Section */}
            <div className="flex justify-center items-center">
                <img
                    src={props.imgURL}
                    className="object-contain w-full max-w-xs h-auto md:max-w-md rounded-4xl"
                    alt="Project"
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col gap-4 mt-4 md:mt-0">
                <p id="projectTitle" className="text-2xl sm:text-3xl lg:text-5xl font-serif text-center md:text-left">
                    {props.title}
                </p>
                <p className="italic text-center md:text-left">{props.techStack}</p>
                <hr className="border-white/50" />
                <p
                    id="projectAbout"
                    className="text-sm sm:text-base md:text-lg text-justify"
                >
                    {props.about}
                </p>
                <div className="self-center md:self-end mt-4">
                    <a href={props.link} target="_blank" rel="noopener noreferrer">
                        <img src="/link-svg.svg" alt="Project Link" className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;