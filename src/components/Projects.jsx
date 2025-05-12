import React from "react";
import ProjectCard from "./ProjectCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



function Project() {
    return (

        <div className="bg-[url('/Backgrounds/Desert.jpg')] h-screen flex bg-cover items-center p-20">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}

            >
                <CarouselContent>
                    <CarouselItem>
                        <ProjectCard
                            imgURL="/Project-logos/connect_plus.png"
                            title="Connect+"
                            about="I built a cool video conferencing web app with using Next.js, Clerk for authentication, and Stream.io for video services. It’s got all the features you need - you can create, schedule, and join meetings, and even watch recorded sessions. I used Firebase Firestore to store all the data and deployed the app on Vercel. I worked with a team to develop both the frontend and backend, so it’s all nicely integrated."
                            techStack="Node.js,Next.Js,Stream SDK,Clerk Auth,Firestore"
                            link="https://connectplus-ebon.vercel.app"
                        />

                    </CarouselItem>
                    <CarouselItem>
                        <ProjectCard
                            imgURL="/Project-logos/the_climate.png"
                            title="The Climate"
                            about="I built an interactive and dynamic Climate App using Swift and Storyboard, powered by the OpenWeather API. Smart state management and caching ensure fast and efficient performance. Core Location is used to fetch weather data based on the user’s location. Swift’s concurrency model ensures real-time data synchronization and prevents slow loading.
Amazingly, it’s 99.999% accurate!"
                            techStack="Swift, Storyboard, OpenWeather API, URL Session, Core Location"
                            link="https://github.com/Nadeem-2005/The-Climate.git"
                        /></CarouselItem>
                    <CarouselItem>
                        <ProjectCard
                            imgURL="/Project-logos/connect_plus.png"
                            title="Connect+"
                            about="I built a cool video conferencing web app with using Next.js, Clerk for authentication, and Stream.io for video services. It’s got all the features you need - you can create, schedule, and join meetings, and even watch recorded sessions. I used Firebase Firestore to store all the data and deployed the app on Vercel. I worked with a team to develop both the frontend and backend, so it’s all nicely integrated."
                            techStack="Node.js,Next.Js,Stream SDK,Clerk Auth,Firestore"
                            link="https://connectplus-ebon.vercel.app"
                        />
                    </CarouselItem>
                    <CarouselItem >...</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}




export default Project;