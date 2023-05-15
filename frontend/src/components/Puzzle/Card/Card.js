import React from 'react';
import './card.css';

const Card = (props) => {
    const handle = () => {
        props.setCase(props.text)
    }
    console.log(props)
    const xoxo = `card ${props.disabled ? 'disabled' : ''}` +
        ` ${props.green ? 'green' : ''}`
    console.log('xoxo', xoxo)
    return (
        <div className={xoxo} onClick={() => { handle() }}>
            <img src={props.image} alt={props.text} />
            <div className="card-text">{props.text}</div>
        </div>
    );
};

export default Card;
