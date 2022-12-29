import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import AppHeader from '../../components/appheader/AppHeader';

const RoleApplyPage = () => {
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
                    <button type="submit" className="big button margin-top">Apply</button>
                </form>
                
                       
            </div>
            <Navbar />
        </>
    );
}

export default RoleApplyPage;