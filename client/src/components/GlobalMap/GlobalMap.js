import React, { useState } from "react";
import './GlobalMap.css';

import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import useAuth from "../../hooks/useAuth";
import favouriteIcon from "../../assets/favourite.svg";
import favouriteFilledIcon from "../../assets/favourite_filled.svg";
import dummyTracksData from "../dummyTracksData.json";


// hack so that leaflet's icons work after going through webpack
// credit: https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

const position = [48.7107847, 2.1714978];
const zoom = 14;

const GlobalMap = () => {

  const { gpxData } = useAuth();
  const { favouriteTracks, setFavouriteTracks } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [filteredTags, setFilteredTags] = useState([]);

  // const gpxFakeData = [[48.7107847, 2.1714978], [48.71052834675527, 2.172627104448315]];

  const handleTagClick = (tag) => {
    // if tag is already in filteredTags, remove it
    if (filteredTags.includes(tag)) {
      setFilteredTags(filteredTags.filter((item) => item !== tag));
    } else {
      // else add it
      setFilteredTags([...filteredTags, tag]);
    }
  }

  // remove favouriteTrack from favouriteTracks array, else add it
  const handleFavouriteClick = (favouriteTrack) => {
    if (favouriteTracks.some((track) => track.name === favouriteTrack.name)) {
      setFavouriteTracks(favouriteTracks.filter((item) => item.name !== favouriteTrack.name));
      console.log("favouriteTrack = ", favouriteTracks);
    } else {
      setFavouriteTracks([...favouriteTracks, favouriteTrack]);
    }
  }

  // return a (not so) bluish color hex code based on a number
  const getColorFromNumber = (number) => {
    const redAmount = ((number + 1) * 40) % 255;
    const greenAmount = ((number + 1) * 40) % 255;
    const blueAmount = ((number + 1) * 80) % 255;
    console.log("#" + redAmount.toString(16) + greenAmount.toString(16) + blueAmount.toString(16));
    return "#" + redAmount.toString(16) + greenAmount.toString(16) + blueAmount.toString(16);
  }

  return (
    <div className="page">
      <MapContainer
        center={position}
        zoom={zoom}
        className="global-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gpxData.length > 0 && gpxData.map((data, index) => {
          /* return Polyline only if the tag is in filteredTags, else if filteredTags is empty, return all Polyline */
          if (filteredTags.length > 0) {
            // if filtered tags work as "OR"
            // if (dummyTracksData[index % dummyTracksData.length].tags.some(tag => filteredTags.includes(tag))) {
            // if filtered tags work as "AND"
            if (filteredTags.every(tag => dummyTracksData[index % dummyTracksData.length].tags.includes(tag))) {
              return (
                <Polyline
                  key={index}
                  pathOptions={{ color: getColorFromNumber(index), weight: 10 }}
                  positions={data}
                  eventHandlers={{
                    click: (e) => {
                      console.log("click on polyline at coords: ", e.latlng);
                      console.log("selected track: ", index % dummyTracksData.length);

                      setSelectedTrack({
                        ...dummyTracksData[index % dummyTracksData.length],
                        clickPosition: e.latlng
                      });
                    }
                  }}
                />
              )
            } else {
              return null;
            }
          } else {
            return (
              <Polyline
                key={index}
                pathOptions={{ color: getColorFromNumber(index), weight: 10 }}
                positions={data}
                eventHandlers={{
                  click: (e) => {
                    console.log("click on polyline at coords: ", e.latlng);
                    setSelectedTrack({
                      ...dummyTracksData[index % dummyTracksData.length],
                      clickPosition: e.latlng
                    });
                  }
                }}
              />
            )
          }
        })}
        <Marker position={position}>
          <Popup>
            Paris-Saclay University. <br /> Your location.
          </Popup>
        </Marker>

        {/* display Popup at mouse click position */}
        {selectedTrack ?
          <Popup position={selectedTrack.clickPosition}>
            <h4>{selectedTrack.name}</h4>
            <p>{selectedTrack.description}</p>
            <h4> - {selectedTrack.author}</h4>
            <div>Tags:
              {selectedTrack.tags.map((tag, index) => {
                return (
                  <button
                    onClick={() => handleTagClick(tag)}
                    key={index}
                    /* add class tag--selected if tag is selected */
                    className={`tag ${filteredTags.includes(tag) ? "tag--selected" : ""}`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
            <button
              className="favourite-button"
              onClick={() => handleFavouriteClick(selectedTrack)}
            >
              {/* if selectedTrack is in favouriteTracks, display a filled heart, else an outlined one */}
              {(favouriteTracks.some((track) => track.name === selectedTrack.name)) ? (
                <>
                  <img className="navbar-item--icon" src={favouriteFilledIcon} alt="favourite" />
                  <p>Remove from favourites</p>
                </>
              ) : (
                <>
                  <img className="navbar-item--icon" src={favouriteIcon} alt="favourite" />
                  <p>Add to favourites</p>
                </>
              )
              }
            </button>
          </Popup>
          : null
        }

      </MapContainer>

      {filteredTags.length === 0 ?
        (
          <div className="filter-container filter-container--no-tag-selected">
            <h5><i>Tip: you can filter the map by tapping on a track and selecting tag(s)</i></h5>

            {/* TODO: delete debug buttons below for production */}
            {/* <button onClick={() => console.log(gpxData)}>Log gpx data</button>
            <button onClick={() => console.log(filteredTags)}>Log filtered tags</button>
            <button onClick={() => console.log(favouriteTracks)}>Log favourite tracks</button> */}

          </div>
        ) : (
          <div className="filter-container">
            <h5>Only tracks with all those tags are displayed on the map:</h5>
            {filteredTags.map((tag, index) => {
              return (
                <button
                  onClick={() => handleTagClick(tag)}
                  key={index}
                  className="tag tag--selected"
                >
                  {tag}
                </button>
              )
            })
            }

            {/* TODO: delete debug buttons below for production */}
            {/* <button onClick={() => console.log(filteredTags)}>Log filtered tags</button> */}

          </div>
        )}

    </div>
  );
};

export default GlobalMap;
