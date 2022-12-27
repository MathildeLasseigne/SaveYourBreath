import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './AccountPage.css';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import AppHeader from '../../components/appheader/AppHeader';

const AccountPage = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <AppHeader className="small" />
            <div>
                <h1>My account</h1>
                <p>{user.username}</p>
                <p>{user.role}</p>
                <p>TODO - add content</p>
                <NavLink
                    to="/roleapply"
                >
                    Apply for contributor role
                </NavLink>
                <button onClick={logout} className="big button" >Log out</button>

            </div>
            <Navbar />
        </>
    );
}

export default AccountPage;