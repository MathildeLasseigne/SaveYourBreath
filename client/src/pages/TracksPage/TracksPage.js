import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TracksPage.css';
import AppHeader from '../../components/appheader/AppHeader';

const TracksPage = () => {
    return (
        <>
            <AppHeader className="small" />
            {/*<!--Page controller-->*/}
            
            <input type="checkbox" className="double-sided-image-button native-hidden"/>
            
            {/*<!--First page-->*/}
            
            <div className='first-page'>
            
                <div className="vertical-flex align-content-center justify-content-center">
              
              
              
              
                    <h1>Tracks</h1>
                    
                    <div className="dropdown contributor-reserved">
                        <input type="checkbox" id= "menuTrackSubmission" className="buttonControl"/>
                        <label className="menu-button" for="menuTrackSubmission">Contributor Tracks</label>
                        <div className="dropdown-content">
                            <a href="#">My tracks</a>
                            <a href="#">Add a new track</a>
                        </div>
                    </div> {/*<!--End of dropdown-->*/}
                    
                    <p>Search for a track to display results</p>
                    
                    <div id="track-results">
                    
                    </div>
                
                
                       
                </div>
            
            </div>
            
            {/*<!--Second page-->*/}
            
            <div className='second-page'>
                <div className="vertical-flex align-content-center justify-content-center">
                    <h1>My tracks</h1>
                    <p>Save a track to begin !</p>
                    
                    <div id='track-favourites'>                    
                    </div>
                    
                </div>
               
            </div>
            <Navbar />
        </>
    );
}

export default TracksPage;