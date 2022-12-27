import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TracksPage.css';
import AppHeader from '../../components/appheader/AppHeader';

const TracksPage = () => {
    return (
        <>
            <AppHeader className="small" />
            <div>
                <h1>My tracks</h1>
                <p>TODO - add content</p>
            </div>
            <Navbar />
        </>
    );
}

export default TracksPage;