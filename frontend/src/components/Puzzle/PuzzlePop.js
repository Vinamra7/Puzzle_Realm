import React, { useState } from 'react';
import axios from 'axios'
import './puzzle.css'
import closer from './close.png'
import { ToastContainer, toast } from 'react-toastify';

const PuzzlePop = (props) => {
    const data = props.data
    const [isOpen, setIsOpen] = useState(true);
    const [Start, setStart] = useState(true)

    const handleClose = () => {
        props.setCase(null)
        setIsOpen(false);
    };
    const user = JSON.parse(localStorage.getItem('userMain'))
    const email = user.email, name = user.name, questionNumber = props.casee[props.casee.length - 1]
    const handleStart = () => {
        //alert(email)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/start`, { email, name, questionNumber })
            .then(response => {
                var res = response.data.message; // response from the server
                alert(res)
            })
            .catch(error => {
                console.log(error.response.status); // status code
                console.log(error.response.data);
            });
        setStart(false)
    }

    const [ans, setAns] = useState('')
    const tstyle = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };
    /*
    toast("Email is not registered", tstyle)
    */

    const ansChange = event => {
        setAns(event.target.value)
    }

    const handleSubmit = (correct) => {
        if (ans !== correct) {
            toast.error('Incorrect answer', tstyle)
            return;
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/end`, { email, questionNumber })
            .then(response => {
                if (response.data.message === 'ok') {
                    toast.success('Submitted', tstyle)
                    setTimeout(() => {
                        alert(data.next)
                        window.location.reload();
                    }, 2000);

                }
            })
            .catch(error => {
                console.log(error.response.status); // status code
                console.log(error.response.data);
            })
    }
    const answer = data.answer
    return (
        <>
            {isOpen && (
                <div className='pop'
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(57, 75, 87,0.9)',
                        color: 'white',
                        padding: '20px',
                        textAlign: 'center',
                        borderRadius: '10px',
                    }}>
                    <img className='closer' src={closer} alt='close'
                        onClick={handleClose} />
                    <h3>{Start ? 'Start' : ''} {props.casee}</h3>
                    <hr />
                    {!Start && <h5>{data.question}</h5>}
                    {(!Start && data.extra !== null) && <img className='imgo' src={data.extra} />}

                    {!Start && <input class="form-control form-control-sm" type="text" placeholder="Your Response" onChange={ansChange} />}
                    <button className='btn go_puz' onClick={Start ? handleStart : () => { handleSubmit(answer) }}>{Start ? 'Start' : 'Submit'}</button>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default PuzzlePop;
