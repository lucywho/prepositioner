import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [feedback, setFeedback] = useState("❓");
    const [score, setScore] = useState(0);
    let i = score;

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
        setFeedback("❓");
        document.getElementById("answer").value = "";

        testquestions.shift();

        setQuestion(testquestions[0]);

        setTestQuestions(testquestions);

        //TO DO: if testquestion =[], render end of test (final score??)
    }

    function submit() {
        console.log("clicked on submit");
        let answer = document.getElementById("answer").value.toLowerCase();
        console.log("submit info", answer);

        let quans = question.answer.toLowerCase();

        if (answer === quans) {
            console.log("success");
            setFeedback("✔️");

            i++;
            console.log("i", i);
            console.log("score", score);

            setScore(i);
        } else {
            console.log("failure");
            setFeedback("❌");
        }
    }

    function show() {
        console.log("clicked on show answer");

        document.getElementById(
            "answer"
        ).value = `${question.first} ${question.answer} ${question.second}`;

        //TO DO: add hidden field for display?
    }

    //console.log("testquestions0", testquestions[0]);

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
                        <input
                            id="answer"
                            type="text"
                            name="answer"
                            placeholder="type answer here..."
                        />

                        <button className="feedback">{feedback}</button>
                        <button className="score">{score}/10</button>
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
