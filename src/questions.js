import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState("");

    useEffect(() => {
        axios
            .get(`/testquestions`)
            .then((response) => {
                // console.log("/testquestions response", response.data.results.rows);

                setTestQuestions(response.data.results.rows); //array of 10 objects

                console.log("test questions", testquestions);
            })
            .catch((err) => {
                console.log("error in settestqs", err);
            });
    }, []);

    return (
        <div className="question-container">
            <div className="German">
                {/* {testquestions[0].first} {"___"}{" "}
                {testquestions[0].last} */}
            </div>
            <div className="English">{/* {testquestions[0].trans} */}</div>
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
