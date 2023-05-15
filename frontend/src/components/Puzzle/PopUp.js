import React, { useState } from 'react';
import './puzzle.css'

const Popup = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        props.setBack(true)
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className='pop'
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(57, 75, 87,0.6)',
                        color: 'white',
                        padding: '20px',
                        textAlign: 'center',
                        borderRadius: '10px',
                    }}
                >
                    <h2>The back story</h2>
                    <hr />
                    <p>In the bustling city of Yarland, there was a young detective named Ava Holmes who was known for her intelligence and her ability to solve even the most complex cases. One day, she received a mysterious letter from a criminal who claimed to have planted a bomb somewhere in the city. The only way to stop the bomb from exploding was to solve a series of clues and uncover the defuse code.

                        Ava knew that time was of the essence and that every second counted. She quickly got to work, determined to solve the clues and save her city from certain destruction.</p>
                    <h5>!!! Save The City !!!</h5>
                    <button className='btn go_puz' onClick={handleClose}>Close</button>
                </div>
            )}
        </>
    );
};

export default Popup;
