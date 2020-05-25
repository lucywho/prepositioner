const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/preps"
);

module.exports.getQuestions = (questions) => {
    return db.query(
        `SELECT * FROM questions WHERE id IN ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            questions[0],
            questions[1],
            questions[2],
            questions[3],
            questions[4],
            questions[5],
            questions[6],
            questions[7],
            questions[8],
            questions[9],
        ]
    );
};
