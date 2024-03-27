"use client";

import "./CurrentMap.css";
// import { useState } from "react"
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

export const CurrentMapView = ({ spot }) => {
  //   console.log(spot.lat);
  const lat = spot?.lat;
  const lng = spot?.lng;

  const position = { lat: lat, lng: lng };
  //   console.log(position);
  return (
    <APIProvider
      className="map"
      apiKey="AIzaSyC9eOlj0m8Vw5Qo4rZvykGOImW4lpvyFDs"
    >
      {/* <div>Google Map</div> */}
      <div className="map-div">
        <Map zoom={10} center={position} mapId="77c4b4fcdd3e09c4">
          <AdvancedMarker position={position}>
            <Pin
              background={"Blue"}
              borderColor={"Black"}
              glyphColor={"yellow"}
            ></Pin>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};
