import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate();
    const logout = () => {
        props.setLoginUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userMain');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }
    const admin = () => {
        navigate('/admin')
    }
    return (
        <nav>
            <div className="navbar">
                <div className="navbar-left">
                    <h5 onClick={() => { navigate('/') }}>Puzzle Realm</h5>
                </div>
                <div className="navbar-right">
                    <button onClick={() => { window.open('https://github.com/Vinamra7/Puzzle_Realm') }}>GitHub</button>
                    <button onClick={admin}>Admin</button>
                    <button onClick={logout} className='logout'>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
