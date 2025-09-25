import React from "react";
import Threads from "./Animations/Threads/Threads";
import RotatingText from "./Animations/RotatingText/RotatingText";
import TextPressure from "./Animations/TextPressure/TextPressure";
import DecryptedText from "./Animations/DecryptedText/DecryptedText";

function Hero() {
    return (
        <div className="relative bg-black text-white space-grotesk ">
            {/* add relative to rollback to prev layout */}
            <div
                style={{
                    // position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "90vh",
                    zIndex: -1,
                }}
            >
                <Threads amplitude={1} distance={0.4} enableMouseInteraction={true} />
            </div>

            {/* Foreground content */}
            <div
                style={{ zIndex: 1 }} //add position:absolute ot revert to old layout
                className="grid grid-cols-1 md:grid-cols-2 place-items-center min-h-screen p-4 md:p-8 gap-8"
                id="about"
            >
                <div className="place-self-center w-full text-center md:text-left" id="About_me">
                    <TextPressure
                        text="Story"
                        fontFamily="sans serrif"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#ffffff"
                        strokeColor="#05dded"
                        minFontSize={198}
                    />
                </div>
                <div className="place-self-center p-3 w-full text-center md:text-left" >
                    <p className="text-2xl sm:text-3xl md:text-4xl leading-snug">
                        A Full Stack Developer with a passion for building powerful backends
                        and crafting seamless digital experiences. Currently diving into iOS app
                        development, I’m always exploring new ways to bring ideas to life
                        through code. When I’m not coding, you’ll find me
                        <RotatingText
                            texts={["playing sports", "hitting the gym", "or gaming"]}
                            mainClassName="inline-block px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg w-fit"
                            style={{
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
                            }}
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                        — always pushing limits, both on and off the screen.
                    </p>
                    <p className="text-center md:text-left mt-6 text-lg sm:text-xl md:text-2xl underline decoration-dotted underline-offset-8 decoration-white/50 hover:decoration-white cursor-pointer w-fit mx-auto md:mx-0">
                        <DecryptedText
                            text="Click here to know more about me"
                            speed={100}
                            maxIterations={20}
                            characters="ABCD1234!?"
                            className="revealed"
                            parentClassName="all-letters"
                            encryptedClassName="encrypted"
                            animateOn="view"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;