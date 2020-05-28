import React, { useState, useEffect } from "react";

import axios from "./axios";

import { useDisplayModal } from "./hooks";

export default function Questions() {
    const [testquestions, setTestQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [submitbutton, setSubmitButton] = useState(true);
    const [nextbutton, setNextButton] = useState(false);
    const [feedback, setFeedback] = useState("❔");
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(true);
    const [showanswer, setShowAnswer] = useState(false);
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

    console.log("testquestions array", testquestions);

    function submit() {
        console.log("clicked on submit");
        setNextButton(true);
        setSubmitButton(false);

        let answer = document.getElementById("answer").value.toLowerCase();

        let quans = question.answer.toLowerCase();

        if (answer === quans) {
            setFeedback("✔️");

            i++;

            setScore(i);
            setCorrect(true);

            testquestions.shift();

            if (testquestions.length == 0 && !showanswer) {
                console.log("array length is 0");

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
        } else {
            setFeedback("❌");
            setCorrect(false);
        }
    }

    function next() {
        setFeedback("❔");
        setShowAnswer(false);
        setSubmitButton(true);
        document.getElementById("answer").value = "";
        setCorrect(true);

        if (testquestions.length > 0) {
            setQuestion(testquestions[0]);

            setTestQuestions(testquestions);
        }
    }

    function tryAgain() {
        setFeedback("❓");
        setSubmitButton(true);
        setNextButton(false);
        document.getElementById("answer").value = "";
    }

    function show() {
        console.log("clicked on show answer");
        document.getElementById("answer").value = "";
        setShowAnswer(true);
        setNextButton(true);

        testquestions.shift();

        if (testquestions.length == 0) {
            console.log("show: array length is 0");
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

    function endQuiz() {
        setModalVisible(true);

        if (score == 10) {
            setEndHeader("Excellent!");
            setEndText("Congratulations! You got all ten questions correct");
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

    function playAgain() {
        console.log("playAgain clicked");
        setModalVisible(false);
        setQuestion("");
        document.location.reload();
    }

    return (
        <div className="question-container">
            {question && (
                <div className="questions">
                    <div className="English">
                        <p>{question.trans}</p>
                    </div>
                    <div className="German">
                        {!showanswer && (
                            <p>
                                {question.first} {"___"} {question.second}
                            </p>
                        )}
                        {showanswer && (
                            <p>
                                {question.first}{" "}
                                <strong>{question.answer}</strong>{" "}
                                {question.second}
                            </p>
                        )}
                    </div>

                    <div className="answer-container">
                        <input
                            id="answer"
                            type="text"
                            name="answer"
                            placeholder="type your answer here..."
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
                                    color: "lightgrey",
                                    backgroundColor: "darkgrey",
                                    borderColor: "darkgrey",
                                }}
                            >
                                Submit
                            </button>
                        )}
                        <div className="feedback">{feedback}</div>
                        <div className="score">{score}/10</div>
                    </div>

                    <div className="nav-buttons">
                        {testquestions.length > 0 && nextbutton && (
                            <button onClick={next}>Next question</button>
                        )}
                        {!correct && !showanswer && (
                            <>
                                <button onClick={tryAgain}>Try Again</button>

                                <button onClick={show}>Show answer</button>
                            </>
                        )}

                        {testquestions.length == 0 && showanswer && (
                            <button onClick={endQuiz}>End Quiz</button>
                        )}

                        {modalvisible && (
                            <div className="endmodal">
                                <h2>{endHeader}</h2>
                                <div className="score">{score} / 10</div>
                                <p>{endText}</p>
                                <button onClick={playAgain}>Play again?</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            ;
        </div>
    );
}
