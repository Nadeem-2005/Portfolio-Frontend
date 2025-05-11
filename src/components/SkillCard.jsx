import React from "react";

function SkillCard(props) {

    return (
        <div className="flex flex-col text-xl  m-2 md:m-4 md:text-2xl text-center ">
            <img src={props.imgURL} />
            <p>{props.name}</p>
        </div>
    );
}

export default SkillCard;