import React from 'react';
import './card.css';

const Card = (props) => {
    const handle = () => {
        props.setCase(props.text)
    }
    const xoxo = `card ${props.disabled ? 'disabled' : ''}` +
        ` ${props.green ? 'green' : ''}`
    return (
        <div className={xoxo} onClick={() => { handle() }}>
            <img src={props.image} alt={props.text} />
            <div className="card-text">{props.text}</div>
        </div>
    );
};

export default Card;
