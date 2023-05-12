import React from 'react';
import './navbar.css';

const Navbar = (props) => {
    const logout = () => {
        props.setLoginUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userMain');
    }
    return (
        <nav>
            <div className="navbar">
                <div className="navbar-left">
                    <h5>Puzzle Realm</h5>
                </div>
                <div className="navbar-right">
                    <button>About</button>
                    <button>Admin</button>
                    <button onClick={logout} className='logout'>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
