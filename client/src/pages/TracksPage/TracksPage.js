import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TracksPage.css';
import AppHeader from '../../components/appheader/AppHeader';

const TracksPage = () => {

    const favouriteTrack = (e) => {
        //TODO: Favourite the track and add it to the 2nd page (in this file)
    };

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
                    
                    <div id="track-results" className="vertical-flex align-content-center justify-content-center all-width">
                    

                        <table className="track-form margins big">
                            <tr className="track-form">
                                <td className="track-form" colspan="6">
                                <span className="tooltip-icon">                    
                                <input type="checkbox" id="distance-icon" className="tooltip-image tooltip-icon native-hidden"/>
                                <div className="tooltip-text small"><span>Distance</span></div>
                            </span>
                            <span><span id="distance-entry">56</span><span> km</span></span>
                            
                                </td>
                                
                                <td className="track-form" colspan="6">
                                
                                <span className="tooltip-image tooltip-icon">                    
                                    <input type="checkbox" id="time-icon" className="tooltip-image tooltip-icon native-hidden"/>
                                    <div className="tooltip-text small"><span>Time</span></div>
                                </span>
                            
                            <span><span id="time-entry">120</span><span> min</span></span>
                                </td>

                                <td class="track-form" colspan="3">
                                    <input type="checkbox" onchange={favouriteTrack(this)} className="tooltip-icon-width favourite-button native-hidden"/>
                                </td>

                            </tr>
                            
                            <tr className="track-form">
                            
                                <td className="track-form" colspan="5">
                                <span className="tooltip-image tooltip-icon">                    
                                    <input type="checkbox" id="trend-up-icon" className="tooltip-image tooltip-icon native-hidden"/>
                                    <div className="tooltip-text small"><span>Uphill</span></div>
                                </span>
                            
                            <span><span id="uphill-entry">137</span><span> m</span></span>
                                </td>
                                
                                <td className="track-form" colspan="5">
                                <span className="tooltip-image tooltip-icon">                    
                                    <input type="checkbox" id="trend-down-icon" className="tooltip-image tooltip-icon native-hidden"/>
                                    <div className="tooltip-text small"><span>Downhill</span></div>
                                </span>
                            
                            <span><span id="downhill-entry">44</span><span> m</span></span>
                                </td>
                                
                                <td className="track-form" colspan="5">
                                <span className="tooltip-image tooltip-icon">                    
                                    <input type="checkbox" id="difficulty-icon" className="tooltip-image tooltip-icon native-hidden"/>
                                    <div className="tooltip-text small"><span>Difficulty</span></div>
                                </span>
                            
                            <span className="difficulty-flag" id="difficulty-entry"></span>
                                </td>
                                
                            </tr>
                        
                        </table>



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