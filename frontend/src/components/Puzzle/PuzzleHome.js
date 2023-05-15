import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import './puzzle.css'
import PopUp from "./PopUp"
import Card from './Card/Card.js';
import './Card/card.css';
import img from './Card/img.jpg'
import keyboard from '../../assets/images/keyboard.png'
import dec from '../../assets/images/dec.png'
import time from '../../assets/images/time.jpg'
import py from '../../assets/images/py.png'
import PuzzlePop from "./PuzzlePop";
import axios from "axios";
import { question1, question2, question3, question4, question5 } from './Data.js'

const PuzzleHome = () => {
    const questions = [question1, question2, question3, question4, question5]
    const [q_a, setq_a] = useState(Array(5).fill(0))
    const [green, setGreen] = useState(Array(5).fill(0))
    var navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userMain'));
        const email = user.email
        axios.post(`${process.env.REACT_APP_SERVER_URL}/pull`, { email })
            .then(response => {
                const x = response.data
                console.log(x)
                setGreen(prevArray => {
                    const newArray = [...prevArray];
                    let i = 1;
                    while ((i <= 5 && x[`q${i}`] === 1)) {
                        newArray[(i - 1)] = 1; i++;
                    }
                    return newArray;
                })
                console.log(green)
                setq_a(prevArray => {
                    const newArray = [...prevArray];
                    let i = 1;
                    do {
                        newArray[(i - 1) % 5] = 1;
                    } while ((i <= 5 && x[`q${i++}`] === 1))
                    return newArray;
                });
            })
            .catch(err => { })
        if (user && user.email) { }
        else navigate('/login')
    }, [])
    const user = JSON.parse(localStorage.getItem('userMain'));

    const cardsData = [
        { image: keyboard, text: '#Clue 1', disabled: q_a[0], green: green[0] },
        { image: dec, text: '#Clue 2', disabled: q_a[1], green: green[1] },
        { image: time, text: '#Clue 3', disabled: q_a[2], green: green[2] },
        { image: py, text: '#Clue 4', disabled: q_a[3], green: green[3] },
        { image: img, text: '#Clue 5', disabled: q_a[4], green: green[4] },
    ];
    const [back, setBack] = useState(false);
    const [casee, setCase] = useState(null)
    if (user && user.email)
        return (
            <div className="puzzle_main">
                <PopUp setBack={setBack} />
                {casee && <PuzzlePop casee={casee} setCase={setCase} setq_a={setq_a} data={questions[casee[casee.length - 1] - '1']} />}
                {back &&
                    <div className="cards-container">
                        {cardsData.map((card) => (
                            <Card key={card.text} image={card.image} text={card.text} disabled={!card.disabled} setCase={setCase} green={card.green} />
                        ))}
                    </div>}
            </div>
        )
    else navigate('/login')
}

export default PuzzleHome
