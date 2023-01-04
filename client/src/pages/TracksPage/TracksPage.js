import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TracksPage.css';
import AppHeader from '../../components/appheader/AppHeader';
import useAuth from '../../hooks/useAuth';
import TrackListItem from '../../components/TrackListItem/TrackListItem';
import dummyTracksData from '../../components/dummyTracksData.json';

const TracksPage = () => {

    const serverUrl = "http://localhost:8080";

    const { setGpxData, user } = useAuth();
    const { favouriteTracks, setFavouriteTracks } = useAuth();
    const [uploadResultMessage, setUploadErrorMessage] = useState("");

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

        return fetch(serverUrl + '/tracks', {
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

            {/*<!--Default page with public tracks-->*/}
            <div className='first-page'>
                <div className="vertical-flex align-content-center justify-content-center">
                    <h1>Public Tracks</h1>
                    {user.role === "contributor" &&
                        <>
                            <div className="dropdown contributor-reserved">
                                <input type="checkbox" id="menuTrackSubmission" className="buttonControl" />
                                <label className="menu-button" htmlFor="menuTrackSubmission">Import your tracks</label>
                                <div className="dropdown-content">
                                    <div>
                                    <div>Add a new track</div>
                                    <form onSubmit={handleUpload} method="post" encType="multipart/form-data">
                                        <input type="file" name="file" multiple />
                                        <input type="submit" value="Upload" />
                                    </form>
                                    {uploadResultMessage && <p>{uploadResultMessage}</p>}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <div id="track-results" className="vertical-flex align-content-center justify-content-center all-width">
                        <div className="public-tracks">
                            {dummyTracksData.map((track, index) => (
                                <TrackListItem
                                    key={index}
                                    name={track.name}
                                    description={track.description}
                                    author={track.author}
                                    email={track.email}
                                    time={track.time}
                                    distance={track.distance}
                                    difficulty={track.difficulty}
                                    tags={track.tags}
                                    minElevation={track.minElevation}
                                    maxElevation={track.maxElevation}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/*<!--Favorite tracks page-->*/}
            <div className='second-page'>
                <div className="vertical-flex align-content-center justify-content-center">
                    <h1>My favourite tracks</h1>
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
                                        difficulty={track.difficulty}
                                        tags={track.tags}
                                        minElevation={track.minElevation}
                                        maxElevation={track.maxElevation}
                                        onClick={() => setFavouriteTracks(favouriteTracks.filter((_, i) => i !== index))}
                                    />
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='navbar-push'></div>
            <Navbar />
        </>
    );
}

export default TracksPage;
