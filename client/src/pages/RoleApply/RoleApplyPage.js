import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import AppHeader from '../../components/appheader/AppHeader';
import useAuth from '../../hooks/useAuth';
import { useNavigate, NavLink } from 'react-router-dom';
import './RoleApplyPage.css';

const RoleApplyPage = () => {
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    // const url = "http://localhost:8080";
    // if using github codespace
    const url = "https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev";

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
        const message = document.getElementById("applicationMessage").value;
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
            <div className="vertical-flex align-content-center justify-content-center text-align-center margin-bottom">
              
              <h1>Application for contributor</h1>
                <div>Thank you for trying to join the ranks of our contributors ! </div>
                <div>
                A contributor can add their own tracks to the database to allow other users to see them !
                </div>
                <div className="margin-top margin-bottom">
                  To finish your application, please fill out the form below.
                </div>
                <form onSubmit={handleApply} className="vertical-flex align-content-center justify-content-center box big margins">
                <label for="applicationMessage">Please explain why you want to become a contributor and how you intend to manage your tracks.</label>
                    <textarea cols="30" rows="10" name="message" placeholder="Application message" id="applicationMessage" className="margin-top message-input"></textarea>
                    <div className="buttons-container">
                        <NavLink
                            to="/account"
                            className="buttons-container__item"
                        >
                            <span>Cancel</span>
                        </NavLink>
                        <button className="buttons-container__item big button margin-top" type="submit">Send</button>
                    </div>
                </form>
                
                       
            </div>
            <Navbar />
        </>
    );
}

export default RoleApplyPage;