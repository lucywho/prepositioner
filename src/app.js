import React, { useState } from "react";
import Logo from "./logo";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteAccount from "./deleteaccount";

function App() {
    useEffect(() => {
        //does this page need to do anything?
    });

    return (
        <BrowserRouter>
            <div className="app-container">
                <div className="nav-bar">
                    <Logo />

                    <Link to="/start">
                        <button>Start</button>
                    </Link>

                    <Link to="/deleteaccount">
                        <button>Delete Account</button>
                    </Link>

                    <button onClick={() => location.replace("/logout")}>
                        Logout
                    </button>
                </div>

                <div className="app-contents">
                    <Route path="/start" render={() => <Questions />} />

                    <Route
                        path="/deleteaccount"
                        render={() => <DeleteAccount />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}
