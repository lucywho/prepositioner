import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState("");

    useEffect(() => {
        axios
            .get(`/testquestions`)
            .then((response) => {
                // console.log(
                //     "/testquestions response",
                //     response.data.results.rows
                // );

                setTestQuestions(response.data.results.rows); //array of 10 objects
            })
            .catch((err) => {
                console.log("error in settestqs", err);
            });
    }, []);
    console.log("test questions", testquestions);

    let question = testquestions[0];
    let i = 1;

    //method called by next button, iterates through testquestions and returns next
    function next() {
        console.log("clicked on next");
        question = testquestions[i];
        console.log("question after next", question);
        i++;
    }

    function submit() {
        console.log("clicked on submit");
    }

    function show() {
        console.log("clicked on show answer");
    }

    return (
        <div className="question-container">
            {question && (
                <div>
                    <div className="English">
                        <p>{question.trans}</p>
                    </div>
                    <div className="German">
                        <p>
                            {" "}
                            {question.first} {"___"} {question.second}
                        </p>
                    </div>
                    <div className="answer-container">
                        <textarea
                            name="answer"
                            placeholder="type answer here..."
                        />
                        <button className="feedback">X or tick</button>
                    </div>
                    <div className="nav-buttons">
                        <button onClick={submit}>Submit answer</button>
                        <button onClick={show}>Show answer</button>
                        <button onClick={next}>Next question</button>
                    </div>
                </div>
            )}
        </div>
    );
}
