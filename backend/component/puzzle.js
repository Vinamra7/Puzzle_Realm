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

module.exports.start = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const questionNumber = req.body.questionNumber;
    const startTimeColumn = `start_q${questionNumber}`;
    connection.query(`SELECT ${startTimeColumn} FROM solve WHERE email = ?`, [email], function (error, results, fields) {
        if (error) {
            res.status(500).send({ error: 'Database error' });
            return;
        }

        const startTime = results[0][startTimeColumn];

        if (!startTime) {
            // update start time
            connection.query(`UPDATE solve SET ${startTimeColumn} = ? WHERE email = ?`, [new Date(), email], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: 'Database error' });
                    return;
                }

                res.send({ message: `Start time for question ${questionNumber} Recorded` });
            });
        } else {
            res.send({ message: `Start time for question ${questionNumber} already Recorded` });
        }
    });
}

module.exports.end = (req, res) => {
    const email = req.body.email;
    const questionNumber = req.body.questionNumber;
    const endTimeColumn = `end_q${questionNumber}`;
    const qq = `q${questionNumber}`
    connection.query(`SELECT ${endTimeColumn} FROM solve WHERE email = ?`, [email], function (error, results, fields) {
        if (error) {
            res.status(500).send({ error: 'Database error' });
            return;
        }
        const endTime = results[0][endTimeColumn];
        if (!endTime) {
            connection.query(`UPDATE solve SET ${endTimeColumn} = ?, ${qq} = 1  WHERE email = ?`, [new Date(), email], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: 'Database error' });
                    return;
                }
                res.send({ message: `ok` });
            });
        } else {
            res.send({ message: `ok` });
        }
    });
};

module.exports.pull = (req, res) => {
    const { email } = req.body;
    const query = `SELECT q1, q2, q3, q4, q5 FROM solve WHERE email = ?`;
    connection.query(query, [email], (err, results) => {
        if (err) {
            // handle error
            res.status(500).send(err);
        } else {
            // assuming results is an array of objects
            res.send(results[0]);
        }
    });
};
