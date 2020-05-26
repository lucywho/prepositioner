import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState([]);
    const [question, setQuestion] = useState({});

    useEffect(() => {
        axios
            .get(`/testquestions`)
            .then((response) => {
                setTestQuestions(response.data.results.rows); //array of 10 objects
                setQuestion(response.data.results.rows[0]);
            })
            .catch((err) => {
                console.log("error in settestqs", err);
            });
    }, []);
    console.log("test questions", testquestions);

    function next() {
        testquestions.shift();

        setQuestion(testquestions[0]);

        setTestQuestions(testquestions);
    }

    function submit() {
        console.log("clicked on submit");
        let answer = document.getElementById("answer").value;
        console.log("submit info", answer);

        let ans = answer.toLowerCase();
        let quans = question.answer.toLowerCase();

        if (ans === quans) {
            console.log("success");

            //if correct, render tick in feedback (and update score)
            // -- feedback needs conditional
            // -- work out how to do score (see c4?)
        } else {
            console.log("failure");
            // if incorrect, render x in feedback
        }

        document.getElementById("answer").value = "";
    }

    function show() {
        console.log("clicked on show answer");
        //TO DO: display question.first, question.answer, question.second
        //decide where - hidden field or replace contents of German field?
    }
    console.log("testquestions0", testquestions[0]);

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
                            id="answer"
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
