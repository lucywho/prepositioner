import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Splash() {
    return (
        <div className="splash">
            <h1>Welcome to</h1>
            <Logo />

            <h2>Ten questions to help you practice your German prepositions</h2>

            <Link to="/questions">
                <button id="start">Click here to to start the quiz</button>
            </Link>
        </div>
    );
}
