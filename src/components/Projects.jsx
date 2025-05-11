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
                            imgURL="/Backgrounds/Desert.jpg"
                            title="Connect+"
                            about="I built a cool video conferencing web app with using Next.js, Clerk for authentication, and Stream.io for video services. It’s got all the features you need - you can create, schedule, and join meetings, and even watch recorded sessions. I used Firebase Firestore to store all the data and deployed the app on Vercel. I worked with a team to develop both the frontend and backend, so it’s all nicely integrated."
                            techStack="Node.js,Next.Js,Stream SDK,Clerk Auth,Firestore"
                            link="https://connectplus-ebon.vercel.app"
                        />
                    </CarouselItem>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}




export default Project;