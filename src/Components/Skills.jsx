import React from "react";
import ScrollReveal from "./Animations/ScrollReveal/ScrollReveal";
import SkillCard from "./SkillCard";
import ScrollFloat from "./Animations/ScrollFloat/ScrollFloat"
import ShinyText from './Animations/ShinyText/ShinyText';


function Skills() {

    return (
        <div className="text-white min-h-screen p-20" id="Skill">
            <ScrollReveal
                baseOpacity={1}
                enableBlur={true}
                baseRotation={5}
                blurStrength={15}
                textClassName="text-center"
                wordAnimationEnd="bottom bottom"
            >
                “A skill is not lost when the hands grow weary, nor when the world turns its back. A skill dies only when it is abandoned and forgotten.”
            </ScrollReveal>
            <div className="flex flex-wrap justify-between mt-20">
                <SkillCard imgURL={"/SkillIcons/c.svg"} name={"C"} />
                <SkillCard imgURL={"/SkillIcons/c++.svg"} name={"C++"} />
                <SkillCard imgURL={"/SkillIcons/java.svg"} name={"Java"} />
                <SkillCard imgURL={"/SkillIcons/python.svg"} name={"Python"} />
                <SkillCard imgURL={"/SkillIcons/swift.svg"} name={"Swift"} />
                <SkillCard imgURL={"/SkillIcons/html.svg"} name={"HTML"} />
                <SkillCard imgURL={"/SkillIcons/css.svg"} name={"CSS"} />
                <SkillCard imgURL={"/SkillIcons/javascript.svg"} name={"Javascript"} />

            </div>
            <div className="flex flex-wrap justify-between m-20 ">
                <SkillCard imgURL={"/SkillIcons/FrameWorks/node-js.svg"} name={"Node.Js"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/react.svg"} name={"React.Js"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/express-js.svg"} name={"Express.Js"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/ejs.svg"} name={"EJS"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/bootstrap.svg"} name={"Bootstrap"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/tailwind-css.svg"} name={"Tailwind CSS"} />
                <SkillCard imgURL={"/SkillIcons/FrameWorks/shadcn-ui.svg"} name={"Shadcn"} />
            </div>
            <ScrollFloat
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=40%'
                stagger={0.03}
                containerClassName="text-center"
                textClassName="text-2xl"

            >
                “Tools don’t build dreams — but knowing how to use them does.”
            </ScrollFloat>
            <div className="flex flex-wrap justify-between m-20 ">
                <SkillCard imgURL={"/SkillIcons/Tools/aws.svg"} name={"aws"} />
                <SkillCard imgURL={"/SkillIcons/Tools/azure.svg"} name={"Azure"} />
                <SkillCard imgURL={"/SkillIcons/Tools/bash.svg"} name={"bash"} />
                <SkillCard imgURL={"/SkillIcons/Tools/firebase.svg"} name={"Firebase"} />
                <SkillCard imgURL={"/SkillIcons/Tools/github.svg"} name={"github"} />
                <SkillCard imgURL={"/SkillIcons/Tools/git.svg"} name={"git"} />
                <SkillCard imgURL={"/SkillIcons/Tools/vs-code.svg"} name={"VS Code"} />
                <SkillCard imgURL={"/SkillIcons/Tools/xcode.svg"} name={"XCode"} />
            </div>
            <div className="text-center">
                <a
                    href="https://icons8.com/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                >
                    <ShinyText
                        text="Icons from Icons8"
                        disabled={false}
                        speed={3}
                        className="text-sm text-blue-400 underline"
                    />
                </a>
            </div>

        </div>
    )
}

export default Skills;

