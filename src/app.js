import React, { useState, useEffect } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Questions from "./questions";
import MiniLogo from "./minilogo";
import Splash from "./splash";

export default function App() {
    useEffect(() => {
        //does this page need to do anything?
    });

    return (
        <BrowserRouter>
            <div className="app-container">
                <div className="strapline">
                    <MiniLogo />
                </div>

                <div className="app-contents">
                    <Route path="/splash" render={() => <Splash />} />

                    <Route path="/questions" render={() => <Questions />} />
                </div>
            </div>
        </BrowserRouter>
    );
}
