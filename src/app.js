import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Questions from "./questions";
import MiniLogo from "./minilogo";
import Splash from "./welcome";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <div className="strapline">
                    <MiniLogo />
                </div>

                <div className="app-contents">
                    <Route exact path="/welcome" render={() => <Splash />} />

                    <Route
                        exact
                        path="/questions"
                        render={() => <Questions />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}
