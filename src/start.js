import React from "react";
import ReactDOM from "react-dom";
// import Welcome from "./welcome";
import App from "./app";

let elem;

elem = (
    <div id="startelem">
        <App />
    </div>
);

ReactDOM.render(elem, document.querySelector("main"));
