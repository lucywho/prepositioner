import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Splash() {
    return (
        <div className="splash">
            <div className="splash-text">Welcome to</div>
            <Logo />
            <div className="splash-text"> Click Start Quiz to begin.</div>
            <Link to="/questions">
                <button id="start">Start Quiz</button>
            </Link>
        </div>
    );
}
