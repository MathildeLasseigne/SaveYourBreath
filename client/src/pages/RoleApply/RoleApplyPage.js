import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import AppHeader from '../../components/appheader/AppHeader';
import useAuth from '../../hooks/useAuth';
import { useNavigate, NavLink } from 'react-router-dom';
import './RoleApplyPage.css';

const RoleApplyPage = () => {
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const url = "http://localhost:8080";
    // if using github codespace
    // const url = "https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev";

    const updateUser = async (inputUser) => {
    return await fetch(url + '/users/' + user.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputUser),
    })
        .then((response) => response.ok ? (response.json()) : (response.json().then((error) => { throw error; })))
        .then((serverUser) => {
            console.log("fetch login success, user is: ", JSON.stringify(user));
            /* setUser(previousUserData => ({
                ...previousUserData,
                role: "contributor" // cheating
            })); */
            setUser(serverUser);
        })
        .catch((error) => {
            console.error('could not fetch /users/:id, you are either logged as a fake user or error:', error);
        });
}

    const handleApply = async (e) => {
        e.preventDefault();
        const message = document.getElementById("message").value;
        const inputUser = {
            role: 'contributor',
            message: message // never used for now
        }

        updateUser(inputUser).then(() => {
            navigate("/account");
        });
    }


    return (
        <>
            <AppHeader className="small" />
            <div>
                {/* <NavLink
                    to="/account"
                    className="back-button"
                >
                    <img className="navbar-item--icon" src={BackIcon} alt="Back to previous page" />
                    <span>Back</span>
                </NavLink> */}
                <h1>Apply for contributor</h1>
                <p>Fill out the form below to apply for contributor status.</p>
                <form onSubmit={handleApply}>
                    <input type="text" name="message" placeholder="Message" id="message" />
                    <div className="buttons-container">
                    <NavLink
                        to="/account"
                            className="buttons-container__item"
                    >
                        <span>Cancel</span>
                    </NavLink>
                        <button className="buttons-container__item" type="submit">Send</button>
                    </div>
                </form>
            </div>
            <Navbar />
        </>
    );
}

export default RoleApplyPage;