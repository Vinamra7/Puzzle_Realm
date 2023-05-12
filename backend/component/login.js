const express = require('express')
const router = express.Router()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'puzzle_realm@outlook.com',
        pass: 'PuzzleRealm1@3'
    }
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL planetScale database.');
});

module.exports.check = (req, res) => {
    const { token } = req.body;
    if (token === undefined || req.body === undefined) {
        res.send({ message: 404 })
    }
    else {
        const user = jwt.verify(token, "myKey");
        // console.log(user.user);
        const passU = user.user
        res.send({ message: 200, user: passU });
    }
}

module.exports.checkMail = (req, res) => {
    const { email } = req.body
    //console.log(email);
    const sql = `select * from user where email = ?`
    const values = [email]
    connection.query(sql, values, (err, result) => {
        if (result.length === 0)
            res.send({ exist: 0 });
        else
            res.send({ exist: 1 });

        if (err) console.log(err)
    })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    const sql = `select * from user where email = ?`
    const values = [email]
    //console.log("here", email, password)
    connection.query(sql, values, function (err, result) {
        if (result.length != 0) {
            //console.log("rememe", result[0].password, password)
            var hash = result[0].password
            bcrypt.compare(password, hash, function (err, reso) {
                console.log("res", reso)
                if (reso === true) {
                    const user = { email, password: hash, name: result[0].name }
                    let token = jwt.sign({ user }, "myKey");
                    res.send({ message: "Login Successfull", user: user, token: token })
                }
                else {
                    res.send({ message: "Incorrect password" })
                }
                if (err) console.log(err)
            });
        }
        else {
            res.send({ message: "User not registered" })
        }
        if (err) console.log(err)
    })
}
module.exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        var hashedPassword = ""
        //console.log("huehue", name, email, password)
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) console.log(err)
                else hashedPassword = hash
            });
        });
        const sql = `select * from user where email = ?`
        const values = [email]
        connection.query(sql, values, function (err, result) {
            //console.log(values, result)
            if (result.length != 0)
                res.send({ message: 'User already registered' });
            else {
                connection.query(
                    'insert into user (email, password, name) values(?,?,?)',
                    [email, hashedPassword, name], (error, results, feilds) => {
                        if (error) {
                            console.log(error)
                            res.send({ error })
                            return
                        }
                        //console.log(name, email, password)
                        res.send({ message: 'User registered successfully!' })
                    }
                )
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.code = async (req, res) => {

    const { email, r } = req.body
    var mailOptions = {
        from: 'puzzle_realm@outlook.com',
        to: email,
        subject: "Puzzle_Realm Login Verification Code",
        text: `Your Code is: ${r}\nUse it to verify your email in Puzzle_Realm.\n\nIf you didn't request this, simply ignore this message.\n`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({ done: 0, detail: error });
            console.log(error);
        }
        else {
            res.send({ done: 1, detail: info });
            console.log(info);
        }
    })
}


module.exports.resetPass = (req, res) => {
    const { email, code } = req.body
    var deliver = {
        from: 'puzzle_realm@outlook.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Code for password reset of your Puzzle_Realm account is ${code}`
    }
    transporter.sendMail(deliver, function (error, info) {
        if (error) {
            res.send({ done: 0, detail: error });
            console.log(error);
        }
        else {
            res.send({ done: 1, detail: info });
            console.log(info);
        }
    })
}

module.exports.updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) console.log(err)
                else {
                    var sql = `update user set password = ? where email = ?`;
                    connection.query(sql, [hash, email], (err, result) => {
                        if (result.length === 0) {
                            res.send({ message: 'Invalid email or password' });
                        } else {
                            res.send({ status: 200 });
                        }
                        if (err) throw err
                    })
                }
            });
        });
        res.send({ status: 200 });

    } catch (err) {
        console.log(err);
    }
}