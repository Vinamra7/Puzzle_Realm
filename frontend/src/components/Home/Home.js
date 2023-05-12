import React, { useState } from 'react'
//import home_bg from '../../assets/images/home_bg.png'
import './home.css'
import { TypeAnimation } from 'react-type-animation';

//#a18473
function Home(props) {

    //fc6d6d
    var user = localStorage.getItem('userMain');
    user = JSON.parse(user);
    const name = user.name;
    const [textColor, setTextColor] = useState('#ffffff');
    return (
        <div>
            <div className='typer'
                style={{ fontSize: '2.7rem', color: 'white' }}>
                <p style={{ fontSize: '3.4rem', color: 'white' }}>Welcome {name}</p>
                Are you ready to
                <span style={{ color: textColor }}>
                    <TypeAnimation
                        color='blue'
                        sequence={[
                            () => setTextColor('#fc6d6d'),
                            ' examine Clues', 600,
                            ' solve Puzzles', 600]}
                        speed={{ type: 'keyStrokeDelayInMs', value: 120 }}
                        repeat={Infinity}
                    />
                </span>
                <div></div>
                <button type="button" class="btn go">Let's go!!</button>
            </div>
        </div>
    )
}

export default Home;