import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Splash() {
    return (
        <div className="splash">
            <div className="splash-text">Welcome to</div>
            <Logo />
            <div className="splash-text">
                {" "}
                Ten questions to help you practice your German prepositions
            </div>
            <Link to="/questions">
                <button id="start">Click here to to start the quiz</button>
            </Link>
        </div>
    );
}
