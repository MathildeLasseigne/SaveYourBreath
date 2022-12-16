import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        login().then(() => {
            navigate("/");
        });
    };

    return (
        <div>
            <div>
                <h1>Log in</h1>
                <button onClick={handleLogin}>Log in</button>
                <p>(the button above works)</p>
                <p>(the buttons below don't, it's a work in progress)</p>
            </div>
            <div className="vertical-flex align-items-center justify-content-center">
                <img src="https://i.postimg.cc/WpCCZG6Z/Logo.png" alt="Logo" id="logo" className="big flex-item" />
                <div id="loginbox" className="vertical-flex">
                    <form action="/login" method="post" className="vertical-flex justify-content-center align-items-center parent-of-spaced">
                        <div className="group-with-label parent-of-spaced">
                            <span>
                                <label for="userid">Username</label>
                                <span className="tooltip-image info-icon">
                                    <input type="checkbox" className="tooltip-image info-icon native-hidden" />
                                    <div className="tooltip-text"><span>The mail adress you used to register</span></div>
                                </span>
                            </span>
                            <input type="email" id="userid" name="userid" aria-describedby="emailHelp" placeholder="Enter username" />
                        </div>
                        <div className="group-with-label parent-of-spaced">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="big button">Sign In</button>
                        <button className="big button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;