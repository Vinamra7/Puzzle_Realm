import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate();
    const logout = () => {
        props.setLoginUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userMain');
    }
    const admin = () => {
        navigate('/admin')
    }
    return (
        <nav>
            <div className="navbar">
                <div className="navbar-left">
                    <h5>Puzzle Realm</h5>
                </div>
                <div className="navbar-right">
                    <button>About</button>
                    <button onClick={admin}>Admin</button>
                    <button onClick={logout} className='logout'>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
