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
              
              {/*roleChooser checkbox: check it to display regular users only, uncheck for contributors only*/}
              <input type="checkbox" className="roleChooser native-hidden" checked/>
              
                <h1>Account</h1>
                
                <div id="username">Username</div>
                
                <div className="contributor-reserved italic margins big">Contributor</div>
                
                <div className="margins big">Welcome to Save your Breath !</div>
                
                
                <div className="vertical-flex align-content-center justify-content-center box margin-top">
                
                    <div className="regular-users-only">
                    Do you want to help out by contributing your own tracks ? Become a contributor now !
                    </div>
                    <a className="margins big button regular-users-only" href="https://www.apply-page/">Apply</a>  
                        
                    <div className="contributor-reserved">
                    As a contributor, you can go to the Tracks page to contribute your own tracks to the database !
                    </div>
                  
                </div>
                
                <button onClick={logout} className="big button margin-top" >Log out</button>
                
                       
            </div>

            {/*<div>
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

    </div>*/}
            <Navbar />
        </>
    );
}

export default AccountPage;