"use client";

import { useState, useEffect } from "react";
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
  const [googleAPI, setGoogleAPI] = useState();
  const lat = spot?.lat;
  const lng = spot?.lng;

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const res = await fetch(`/api/spots/googleMapKey`, {
          method: "GET",
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data.key);
        if (data) {
          setGoogleAPI(data.key);
        }
        // console.log(googleAPI);
      } catch (e) {
        return e
      }
    };

    fetchApiKey();
  }, []);

  const position = { lat: lat, lng: lng };
  //   console.log(position);
  if (googleAPI) return (
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
