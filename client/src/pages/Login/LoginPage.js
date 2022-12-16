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
            </div>
            <p>To do</p>
        </div>
    );
};

export default LoginPage;