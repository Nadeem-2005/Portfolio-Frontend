import React from "react";

function ProjectCard(props) {
    return (
        <div className="rounded-xl bg-white/30 backdrop-blur-md rounded-xl p-4 md:grid grid-cols-2 text-white p-10 gap-10 py-10">
            <div className="flex justify-center items-center">
                <img src={props.imgURL} className="object-contain " />
            </div>
            <div className="flex flex-col gap-10 mt-10 ">
                <p id="projectTitle" className="text-6xl lg:text-8xl font-serif">{props.title}</p>
                <p className="italic">{props.techStack}</p>
                <hr />
                <p id="projectAbout" className="text-md md:text-xl">{props.about}</p>
                <a href={props.link} target="blank" className="self-end"><img src="/link-svg.svg" alt="" /></a>
            </div>
        </div>
    );
}

export default ProjectCard;