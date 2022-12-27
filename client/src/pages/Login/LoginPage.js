import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppHeader from '../../components/appheader/AppHeader';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        // FormData not working without a installing an Express middleware (maybe multer)
        // const formData = new FormData(document.getElementById("login-form"));
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password).then(() => {
            navigate("/");
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
                                <span className="tooltip-image info-icon">
                                    <input type="checkbox" className="tooltip-image info-icon native-hidden" />
                                    <div className="tooltip-text"><span>The mail adress you used to register</span></div>
                                </span>
                            </span>
                            <input type="email" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter username" />
                        </div>
                        <div className="group-with-label parent-of-spaced">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </div>
                        {error && <p className="error-message">{error.message}</p>}
                        <button type="submit" className="big button">Sign In</button>
                        <button className="big button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;