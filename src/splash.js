import React from "react";
import { Link } from "react-router-dom";

export default function Splash() {
    return (
        <div className="splash">
            <Logo />
            <div className="splash-text">
                Welcome to Practice Prepositions. <br />
                Click Start Test to begin.
            </div>
            <Link to="/questions">
                <button>Start Test</button>
            </Link>
        </div>
    );
}
