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

            <div className="vertical-flex align-content-center justify-content-center">
                <h1>Account</h1>
                <p>{user.username}</p>
                <div className="margins big">Welcome to Save your Breath !</div>

                {user.role === "contributor" ? (
                    <div className="vertical-flex align-content-center justify-content-center box margin-top">
                        <p>Congratulations ! You are now a contributor !</p>
                        <p>Feel free to contribute to the map by uploading your <NavLink to="/tracks">tracks</NavLink>. </p>
                    </div>
                ) : (
                    <div className="vertical-flex align-content-center justify-content-center box margin-top">
                        <div>
                            Do you want to help out by contributing your own tracks ? Become a contributor now !
                        </div>
                        <NavLink
                            to="/roleapply"
                            className="margins big button regular-users-only"
                        >
                            Apply
                        </NavLink>
                        <div>
                            As a contributor, you can go to the Tracks page to contribute your own tracks to the database !
                        </div>
                    </div>
                )}

                <button onClick={logout} className="big button margin-top" >Log out</button>

            </div>
            <Navbar />
        </>
    );
}

export default AccountPage;
