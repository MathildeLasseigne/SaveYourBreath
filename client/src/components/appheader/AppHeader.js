import React from 'react';
import './AppHeader.css';

const AppHeader = (props) => {
    return (
        <header className="App-header">
            <img src="https://i.postimg.cc/WpCCZG6Z/Logo.png" alt="Logo" className={`logo ${props.className}`} />
        </header>
    );
}

export default AppHeader;