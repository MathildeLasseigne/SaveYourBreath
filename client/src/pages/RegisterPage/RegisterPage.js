import React, { useState } from 'react';
import './RegisterPage.css';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppHeader from '../../components/appheader/AppHeader';

const LoginPage = () => {
    const { register } = useAuth();
    // null = not clicked on register yet, 200 = user successfully registered, 400 = error when registering
    const [registerStatus, setRegisterStatus] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        register(username, password)
            .then((code) => {
                setRegisterStatus(code);
            })
            .catch((error) => {
                console.error("error while registering: ", error);
            });
    };

    return (
        <div>
            <div className="vertical-flex align-content-center justify-content-center">
                <AppHeader className="big" />
                <div id="loginbox" className="vertical-flex">
                    <h2>Create an account</h2>
                    {/* Display successful message if user successfully registered, else display the register form */}
                    {registerStatus && (registerStatus === 200) ? (
                        <>
                            <p className="message--success">User successfully registered</p>
                            <p>You can now <NavLink to="/login">login</NavLink></p>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleRegister} id="login-form" className="vertical-flex justify-content-center align-content-center parent-of-spaced">
                                <div className="group-with-label parent-of-spaced">
                                    <span>
                                        <label htmlFor="username">Username</label>
                                        <span className="tooltip-image info-icon">
                                            <input type="checkbox" className="tooltip-image info-icon native-hidden" />
                                            <div className="tooltip-text"><span>No need to use an email adress, just use an username you like!</span></div>
                                        </span>
                                    </span>
                                    <input type="text" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter username" />
                                </div>
                                <div className="group-with-label parent-of-spaced">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" placeholder="Password" />
                                </div>
                                {registerStatus && (registerStatus === 400) && <p className="message--error">Username taken. Try a different username.</p>}
                                <button type="submit" className="big button">Sign Up</button>
                            </form>
                            <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
