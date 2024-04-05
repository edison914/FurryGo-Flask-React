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
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  console.log(googleAPI);
  const position = { lat: lat, lng: lng };
  //   console.log(position);
  return (
    <APIProvider apiKey={googleAPI}>
      <div className="map-div">
        <Map
          defaultCenter={position}
          mapId="77c4b4fcdd3e09c4"
          defaultZoom={11}
          gestureHandling="greedy"
          zoomControl={true}
        >
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
