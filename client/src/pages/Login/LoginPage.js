import React from 'react';
import './LoginPage.css';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppHeader from '../../components/appheader/AppHeader';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error, initializeGpxData } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password)
        .then(() => {
            initializeGpxData();
        })
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            console.error("error while logging in: ", error);
        });
    };

    return (
        <div>
            <div className="vertical-flex align-content-center justify-content-center">
                <AppHeader className="big" />
                <div id="loginbox" className="vertical-flex">
                    {/* <form action="/login" method="post" className="vertical-flex justify-content-center align-content-center parent-of-spaced"> */}
                    <form onSubmit={handleLogin} id="login-form" className="vertical-flex justify-content-center align-content-center parent-of-spaced">
                        <div className="group-with-label parent-of-spaced">
                            <span>
                                <label htmlFor="username">Username</label>
                            </span>
                            <input type="text" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter username" />
                        </div>
                        <div className="group-with-label parent-of-spaced">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </div>
                        {error && <p className="error-message">{error.message}</p>}
                        <button type="submit" className="big button">Log In</button>
                    </form>
                    <p>Don't have an account yet? <NavLink to="/register">Sign up</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
