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
    for (var numbers = [], i = 1; i < 42; i++) {
        numbers[i] = i;
    }

    function shuffle(array) {
        let temp,
            current,
            upper = array.length;
        if (upper)
            while (--upper) {
                current = Math.floor(Math.random() * (upper + 1));
                temp = array[current];
                array[current] = array[upper];
                array[upper] = temp;
            }
        return array;
    }
    numbers = shuffle(numbers);
    questions = numbers.slice([0], [10]);

    // console.log("questions: ", questions);

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
