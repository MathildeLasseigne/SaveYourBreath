import React from "react";
import './GlobalMap.css';


import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// hack so that leaflet's images work after going through webpack
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

  // States
  // const [value, updateValue] = useState(0);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      className="global-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Paris-Saclay University. <br /> Your location.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default GlobalMap;
