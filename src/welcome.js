import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="welcomediv">
            <div className="welcomebanner">
                <img id="splashimg" src="/image.jpg" />
                <div className="welcometext">
                    <h1>Welcome to</h1>
                    <h1 className="Headline">
                        <em>Prepositions!</em>
                    </h1>

                    <h3>Practice your German prepositions!</h3>
                </div>
            </div>
            <div className="welcomecomponent">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={ResetPassword} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
