import React from 'react';
import './AppHeader.css';

const AppHeader = (props) => {
    return (
        <header className="App-header">
            <div className="all-width vertical-flex">
              <img src="https://i.postimg.cc/Y9vw25Yx/Logo.png" alt="Logo" className={`logo ${props.className}`} />
            </div>
            {/*<img src="https://i.postimg.cc/Y9vw25Yx/Logo.png" alt="Logo" className={`logo ${props.className}`} />*/}
        </header>
    );
}

export default AppHeader;