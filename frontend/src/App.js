import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import './components/SignIn/login.css'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PuzzleHome from './components/Puzzle/PuzzleHome';
import Admin from './components/Admin/Admin';

function App() {
  const [user, setLoginUser] = useState({});
  useEffect(() => {
    document.title = 'Puzzle Realm';
    if (localStorage.getItem('userMain')) {
      let u = JSON.parse(localStorage.getItem('userMain'));
      setLoginUser(u);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        {
          (user && user.email) ? <Navbar user={user} setLoginUser={setLoginUser} /> : <></>
        }
        <Routes>
          <Route exact path="/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/" element={
            user && user.email ? <Home user={user} setLoginUser={setLoginUser} /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route exact path='/puzzle' element={
            <PuzzleHome user={user} setLoginUser={setLoginUser} />}
          />
          <Route exact path='/admin' element={<Admin />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
