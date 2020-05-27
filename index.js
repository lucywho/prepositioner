const express = require("express");
const app = express();

const compression = require("compression");
const db = require("./db.js");

const cookieSession = require("cookie-session");
const csurf = require("csurf");

//_____MIDDLEWARE______
app.use(compression());

app.use(
    cookieSession({
        secret: "It'll be fiiiine",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.static("public"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "deny");
    next();
});

//_____ROUTES_______

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get("/welcome", (req, res) => {
//     console.log("/welcome route hit");
//     if (req.session.userId) {
//         res.redirect("/");
//     } else {
//         res.sendFile(__dirname + "/index.html");
//     }
// });

app.get("/testquestions", (req, res) => {
    let numbers = [];

    for (let i = 0; i < 41; i++) {
        if (numbers.length < i) {
            let num = Math.floor(Math.random() * 40 + 1);
            numbers.push(num);
        }
    }

    //***CHANGE THIS BACK TO 10 WHEN FINISHED TESTING!***//
    questions = numbers.slice([0], [3]);

    db.getQuestions(questions)
        .then((results) => {
            // console.log("getquestions results: ", results.rows);

            res.json({ results });
        })
        .catch((err) => {
            console.log("error in getQuestions: ", err);
        });
}); //end of testquestions

app.get("/", (req, res) => {
    res.redirect("/splash");
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//_________SERVER LISTENING_______

app.listen(8080, function() {
    console.log("prepositions server running");
});
