import React, { useState, useEffect } from "react";

import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Questions() {
    useEffect(() => {
        axios.get(`/testquestions`).then((response) => {
            // console.log("/testquestions response", response.data.results.rows);
            const testquestions = response.data.results.rows; //array of objects
            console.log("test questions", testquestions);
        });
    });

    return (
        <div className="question-container">
            <div className="German"> display German questions here </div>
            <div className="English">display English translation here</div>
            <div className="answer-container">
                <textarea name="answer" placeholder="type answer here..." />
                <button className="feedback">X or tick</button>
            </div>
            <div className="nav-buttons">
                <button>Submit answer</button>
                <button>Show answer</button>
                <button>Next question</button>
            </div>
        </div>
    );
}
