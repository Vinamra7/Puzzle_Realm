import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { TypeAnimation } from 'react-type-animation';

function Admin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/results`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='admin_main'>
            <TypeAnimation
                style={{ fontSize: '1.6rem', color: 'white', marginLeft: '3%' }}
                sequence={[
                    `User's Details`, 600]}
                speed={{ type: 'keyStrokeDelayInMs', value: 120 }}
            />
            {data.map((item, index) => (
                <ResultCard key={index} data={item} />
            ))}
        </div>
    );
}

function ResultCard({ data }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='card_admin' onClick={handleClick} style={{ border: '1px solid black' }}>
            <div>{data.name}</div>
            <div>{data.email}</div>
            {expanded && (
                <>
                    <div>Total Time Spent: {data.totalTimeSpent} seconds</div>
                    <div>Total Questions Solved: {data.totalQuestionsSolved}</div>
                    <div>Time Per Question:</div>
                    <ul>
                        {Object.entries(data.timePerQuestion).map(([key, value]) => (
                            <li key={key}>{key}: {value ? `${value} seconds` : 'Unsolved'}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Admin;
