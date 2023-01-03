import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TracksPage.css';
import AppHeader from '../../components/appheader/AppHeader';
import useAuth from '../../hooks/useAuth';
import TrackListItem from '../../components/TrackListItem/TrackListItem';
import dummyTracksData from '../../components/dummyTracksData.json';

const TracksPage = () => {

    // const url = "http://localhost:8080/";
    // if using github codespace
    const url = "https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev";

    const { setGpxData, user } = useAuth();
    const { favouriteTracks, setFavouriteTracks } = useAuth();
    const [uploadResultMessage, setUploadErrorMessage] = useState("");

    const favouriteTrack = (e) => {
        //TODO: Favourite the track and add it to the 2nd page (in this file)
        //EDIT: cancelled for now, favouriting a track is already done in the map page
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        // old code with multiple files upload not supported
        /* const uploadedFile= e.target.file.files[0];
        fetch('https://d-bao-organic-telegram-647p6q7ww77246pw-8080.preview.app.github.dev/tracks', {
          method: 'POST',
          body: uploadedFile
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          }); */
        const myFiles = e.target.file.files;
        const formData = new FormData()

        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key))
        })

        return fetch(url + '/tracks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then((response) => response.ok ? response.json() : Promise.reject(response))
            .then(json => {
                console.log('Success:', json);
                setUploadErrorMessage("File uploaded successfully! You can now see the track on the map.");
                // if json returned from the server is not empty, push it to the gpxData state
                if (Object.keys(json).length > 0 && Object.keys(json)[0].length > 0) {
                    setGpxData(previousUserData => ([
                        ...previousUserData,
                        json
                    ]));
                    console.log("gpxData changed ");
                } else {
                    console.log("gpxData not changed");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setUploadErrorMessage("Filed upload failed! Make sure the file is a valid GPX file.");
            });
    }

    return (
        <>
            <AppHeader className="small" />
            {/*<!--Page controller-->*/}

            <input type="checkbox" className="double-sided-image-button native-hidden" />

            {/* TODO TRACKS: place the upload buttons and error text at the right position (not top of the page like here) */}
            {user.role === "contributor" &&
                <>
                    <form onSubmit={handleUpload} method="post" encType="multipart/form-data">
                        <input type="file" name="file" multiple />
                        <input type="submit" value="Upload" />
                    </form>
                    {uploadResultMessage && <p>{uploadResultMessage}</p>}
                </>
            }

            {/*<!--First page-->*/}

            <div className='first-page'>
                {/* TODO TRACKS: public tracks list, place it in the right place (not top of the page like here) and edit TrackListItem.js & css */}
                

                <div className="vertical-flex align-content-center justify-content-center">




                    <h1>Public Tracks</h1>

                    {/* TODO TRACKS: place the upload buttons and error text at the right position (not top of the page like here) */}
                    {user.role === "contributor" &&
                        <>
                            <form onSubmit={handleUpload} method="post" encType="multipart/form-data">
                                <input type="file" name="file" multiple />
                                <input type="submit" value="Upload" />
                            </form>
                            {uploadResultMessage && <p>{uploadResultMessage}</p>}

                            <div className="dropdown contributor-reserved">
                                <input type="checkbox" id="menuTrackSubmission" className="buttonControl" />
                                <label className="menu-button" for="menuTrackSubmission">Contributor Tracks</label>
                                <div className="dropdown-content">
                                    <a href="#">My tracks</a>
                                    <a href="#">Add a new track</a> {/* Juste une lien vers une page 'upload' */}
                                </div>
                            </div> {/*<!--End of dropdown-->*/}
                            
                        </>
                    }

                    


                    <div id="track-results" className="vertical-flex align-content-center justify-content-center all-width">


                        <div className="public-tracks">
                            <h2>Public Tracks</h2>
                            {dummyTracksData.map((track, index) => (
                                <TrackListItem
                                    key={index}
                                    name={track.name}
                                    description={track.description}
                                    author={track.author}
                                    email={track.email}
                                    time={track.time}
                                    distance={track.distance}
                                    tags={track.tags}
                                    minElevation={track.minElevation}
                                    maxElevation={track.maxElevation}
                                />
                            ))}
                        </div>

                        <table className="track-form margins big">
                            <tr className="track-form">
                                <td className="track-form" colspan="6">
                                    <span className="tooltip-icon">
                                        <input type="checkbox" id="distance-icon" className="tooltip-image tooltip-icon native-hidden" />
                                        <div className="tooltip-text small"><span>Distance</span></div>
                                    </span>
                                    <span><span id="distance-entry">56</span><span> km</span></span>

                                </td>

                                <td className="track-form" colspan="6">

                                    <span className="tooltip-image tooltip-icon">
                                        <input type="checkbox" id="time-icon" className="tooltip-image tooltip-icon native-hidden" />
                                        <div className="tooltip-text small"><span>Time</span></div>
                                    </span>

                                    <span><span id="time-entry">120</span><span> min</span></span>
                                </td>

                                <td class="track-form" colspan="3">
                                    <input type="checkbox" onchange={favouriteTrack(this)} className="tooltip-icon-width favourite-button native-hidden" />
                                </td>

                            </tr>

                            <tr className="track-form">

                                <td className="track-form" colspan="5">
                                    <span className="tooltip-image tooltip-icon">
                                        <input type="checkbox" id="trend-up-icon" className="tooltip-image tooltip-icon native-hidden" />
                                        <div className="tooltip-text small"><span>Uphill</span></div>
                                    </span>

                                    <span><span id="uphill-entry">137</span><span> m</span></span>
                                </td>

                                <td className="track-form" colspan="5">
                                    <span className="tooltip-image tooltip-icon">
                                        <input type="checkbox" id="trend-down-icon" className="tooltip-image tooltip-icon native-hidden" />
                                        <div className="tooltip-text small"><span>Downhill</span></div>
                                    </span>

                                    <span><span id="downhill-entry">44</span><span> m</span></span>
                                </td>

                                <td className="track-form" colspan="5">
                                    <span className="tooltip-image tooltip-icon">
                                        <input type="checkbox" id="difficulty-icon" className="tooltip-image tooltip-icon native-hidden" />
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
                    <h1>My favourite tracks</h1>
                    {/* TODO TRACKS: favourite tracks list, there may be nothing left to do if TrackListItem.js & css are finished */}
                    {favouriteTracks.length === 0 ? (
                        <p>The tracks added to your favourites will be listed here !</p>
                    ) : (
                        <div className="favourite-tracks">
                            {favouriteTracks.map((track, index) => (
                                <>
                                    <TrackListItem
                                        key={index}
                                        name={track.name}
                                        description={track.description}
                                        author={track.author}
                                        email={track.email}
                                        time={track.time}
                                        distance={track.distance}
                                        tags={track.tags}
                                        minElevation={track.minElevation}
                                        maxElevation={track.maxElevation}
                                        onClick={() => setFavouriteTracks(favouriteTracks.filter((_, i) => i !== index))}
                                    />
                                </>
                            ))}
                        </div>
                    )}
                    <div id='track-favourites'>
                    </div>

                </div>

            </div>
            <div className='navbar-push'></div>
            <Navbar />
        </>
    );
}

export default TracksPage;
