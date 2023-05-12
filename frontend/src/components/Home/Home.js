import React from 'react'

function Home(props) {

    return (
        <>
            <button onClick={() => { props.setLoginUser() }}>hello home</button>
        </>
    )
}

export default Home;