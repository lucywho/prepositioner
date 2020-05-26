import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [feedback, setFeedback] = useState("❓");
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(true);
    const [modalvisible, setModalVisible] = useState(true);
    const [endHeader, setEndHeader] = useState("");
    const [endText, setEndText] = useState("");

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

        if (testquestions.length > 0) {
            setQuestion(testquestions[0]);

            setTestQuestions(testquestions);
        } else {
            setQuestion("");
            setModalVisible(true);

            if (score == 10) {
                setEndHeader("Excellent!");
                setEndText(
                    "Congratulations! You got all ten questions correct"
                );
            } else if (score == 8 || score == 9) {
                setEndHeader("Well done!");
                setEndText("Great score!");
            } else if (score == 6 || score == 7) {
                setEndHeader("Good Effort!");
                setEndText("You're getting there! Keep practicing");
            } else if (score < 6 && score > 2) {
                setEndHeader("Not bad!");
                setEndText("Prepositions are hard. Keep practicing");
            } else {
                setEndHeader("Oh dear!");
                setEndText("You need more practice");
            }
        }
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
            setCorrect(true);
        } else {
            console.log("failure");
            setFeedback("❌");
            setCorrect(false);
        }
    }

    function tryAgain() {
        setFeedback("❓");
        document.getElementById("answer").value = "";
    }

    function show() {
        console.log("clicked on show answer");

        document.getElementById(
            "answer"
        ).value = `${question.first} ${question.answer} ${question.second}`;

        //TO DO: add hidden field for display?
    }

    function playAgain() {
        console.log("playAgain clicked");
        setModalVisible(false);
        //useEffect();
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
                        <input
                            id="answer"
                            type="text"
                            name="answer"
                            placeholder="type answer here..."
                        />

                        <div className="feedback">{feedback}</div>
                        <div className="score">{score}/10</div>
                    </div>
                    <div className="nav-buttons">
                        <button onClick={submit}>Submit answer</button>
                        {!correct && (
                            <>
                                <button onClick={tryAgain}>Try Again</button>
                                <button onClick={show}>Show answer</button>
                            </>
                        )}
                        {testquestions.length > 1 && (
                            <button onClick={next}>Next question</button>
                        )}
                        {testquestions.length < 1 && modalvisible && (
                            <div className="endmodal">
                                <h2>{endHeader}</h2>
                                <div className="score">{score}/10</div>
                                <p>{endText}</p>
                                <button onClick={playAgain}>Play again?</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
