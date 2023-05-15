const express = require('express')
const router = express.Router()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.sql_database,
    ssl: {
        rejectUnauthorized: true,
    }
});

module.exports.results = (req, res) => {
    connection.query('SELECT * FROM solve LIMIT 10', function (error, results, fields) {
        if (error) throw error;
        let output = [];
        results.forEach(result => {
            let totalTime = 0;
            let solvedQuestions = 0;
            let timePerQuestion = {};
            for (let i = 1; i <= 5; i++) {
                if (result[`q${i}`]) {
                    let startTime = result[`start_q${i}`];
                    let endTime = result[`end_q${i}`];
                    if (startTime && endTime) {
                        let timeSpent = (new Date(endTime) - new Date(startTime)) / 1000;
                        totalTime += timeSpent;
                        solvedQuestions++;
                        timePerQuestion[`q${i}`] = timeSpent;
                    } else {
                        timePerQuestion[`q${i}`] = null;
                    }
                } else {
                    timePerQuestion[`q${i}`] = null;
                }
            }
            output.push({
                email: result.email,
                name: result.name,
                totalTimeSpent: totalTime,
                totalQuestionsSolved: solvedQuestions,
                timePerQuestion: timePerQuestion
            });
        });
        res.send(output);
    });
}