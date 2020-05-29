import React, { useState, useEffect } from "react";

import axios from "./axios";

import { Link } from "react-router-dom";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [submitbutton, setSubmitButton] = useState(true);
    const [nextbutton, setNextButton] = useState(false);
    const [feedback, setFeedback] = useState("❔");
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(true);
    const [showcorrect, setShowCorrect] = useState(false);
    const [showanswer, setShowAnswer] = useState(false);
    const [endbutton, setEndButton] = useState(false);
    const [modalvisible, setModalVisible] = useState(false);
    const [endHeader, setEndHeader] = useState("");
    const [endText, setEndText] = useState("");

    let i = score;

    useEffect(() => {
        axios
            .get(`/testquestions`)
            .then((response) => {
                setTestQuestions(response.data.results.rows);
                setQuestion(response.data.results.rows[0]);
            })
            .catch((err) => {
                console.log("error in settestqs", err);
            });
    }, []);

    function submit() {
        setNextButton(true);
        setSubmitButton(false);

        let answer = document.getElementById("answer").value.toLowerCase();

        let quans = question.answer.toLowerCase();

        if (answer === quans) {
            setFeedback("✔️");

            i++;

            setScore(i);
            setCorrect(true);
            setShowCorrect(true);

            testquestions.shift();

            if (testquestions.length == 0) {
                setEndButton(true);
            }
        } else {
            setFeedback("❌");
            setCorrect(false);
        }
    }

    function next() {
        setFeedback("❔");
        setShowAnswer(false);
        setShowCorrect(false);
        setSubmitButton(true);

        document.getElementById("answer").value = "";
        setCorrect(true);

        if (testquestions.length > 0) {
            setQuestion(testquestions[0]);

            setTestQuestions(testquestions);
        }
    }

    function tryAgain() {
        setFeedback("❔");
        setSubmitButton(true);
        setNextButton(false);
        document.getElementById("answer").value = "";
    }

    function show() {
        document.getElementById("answer").value = "";
        setShowAnswer(true);
        setShowCorrect(false);

        testquestions.shift();

        if (testquestions.length == 0) {
            setEndButton(true);
        } else {
            setNextButton(true);
        }
    }

    function endQuiz() {
        setModalVisible(true);

        if (score == 10) {
            setEndHeader("Excellent!");
            setEndText("Congratulations! You got all ten questions correct!");
        } else if (score == 8 || score == 9) {
            setEndHeader("Well done!");
            setEndText("Great score!");
        } else if (score == 6 || score == 7) {
            setEndHeader("Good Effort!");
            setEndText("You're getting there! Keep practicing!");
        } else if (score < 6 && score > 2) {
            setEndHeader("Not bad!");
            setEndText("Prepositions are hard. Keep practicing!");
        } else {
            setEndHeader("Oh dear!");
            setEndText("You need more practice!");
        }
    }

    function playAgain() {
        setQuestion("");
        setModalVisible(false);

        document.location.reload();
    }

    return (
        <div className="question-container">
            {question && (
                <div className="questions">
                    <div className="display-container">
                        <div className="question-answer">
                            <div className="English">
                                <p>{question.trans}</p>
                            </div>
                            <div className="German">
                                {!showanswer && !showcorrect && (
                                    <p>
                                        {question.first} {"___"}{" "}
                                        {question.second}
                                    </p>
                                )}
                                {showanswer && (
                                    <p>
                                        {question.first}{" "}
                                        <strong>{question.answer}</strong>{" "}
                                        {question.second}
                                    </p>
                                )}
                                {showcorrect && (
                                    <p>
                                        {question.first}{" "}
                                        <span id="yes">{question.answer}</span>{" "}
                                        {question.second}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="feedback-score">
                            <div className="score">{score}</div>
                            <div className="feedback">{feedback}</div>
                        </div>
                    </div>
                    <div className="answer-container">
                        <input
                            id="answer"
                            type="text"
                            name="answer"
                            placeholder="type your answer here"
                        />
                        {submitbutton && (
                            <button className="submit" onClick={submit}>
                                Submit
                            </button>
                        )}
                        {!submitbutton && (
                            <button
                                className="submit"
                                style={{
                                    color: "grey",
                                    backgroundColor: "gainsboro",
                                    borderColor: "darkgrey",
                                }}
                            >
                                Submit
                            </button>
                        )}
                    </div>

                    <div className="nav-buttons">
                        {testquestions.length > 0 && nextbutton && correct && (
                            <button onClick={next}>Next question</button>
                        )}
                        {!correct && !showanswer && (
                            <>
                                <button onClick={tryAgain}>Try again</button>
                                <button onClick={show}>Show answer</button>
                            </>
                        )}

                        {endbutton && (
                            <button onClick={endQuiz}>End quiz</button>
                        )}

                        {modalvisible && (
                            <div className="endmodal">
                                <h2>{endHeader}</h2>
                                <div className="score">{score} / 10</div>
                                <p>{endText}</p>
                                <button onClick={playAgain}>Play again?</button>

                                <Link to="/welcome">
                                    <button id="end">I'm done!</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
            ;
        </div>
    );
}
