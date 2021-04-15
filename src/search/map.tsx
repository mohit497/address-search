import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { AppState, appState } from "../state/state";
import React from "react";
import { API_KEY } from "../config";

const AnyReactComponent = (props: any) => (
  <div hidden={props.hidden} className="marker p-2">
    {" "}
    <FontAwesomeIcon icon={faMapMarker} />
    {props.text}
  </div>
);

export function GoogleMap(props: any) {
  const state: AppState = useReactiveVar(appState);
  const [lat, setlat] = useState(-37.8136);
  const [lng, setlng] = useState(144.9631);


  const cords = {
    center: {
      lat: -37.8136,
      lng: 144.9631,
    },
    zoom: 9,
  };

  // show result on map if only one result returned by search
  useEffect(() => {
    if (state.results.length === 1) {
      appState({ ...state, selectedAddress: state?.results[0] });
    }
  },[state?.results]);

  // re render map on selection change
  useEffect(() => {
    if (!!state.selectedAddress) {
      setlat(state.selectedAddress?.location.lat);
      setlng(state.selectedAddress?.location.lng);
    }
  }, [state.selectedAddress]);

  return (
    // Important! Always set the container height explicitly
    <div
      style={{ height: "70vh", width: "100%" }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY}}
        defaultCenter={cords.center}
        defaultZoom={11}
        center={{ lat: lat, lng: lng }}
      >
        <AnyReactComponent
          hidden={!state.selectedAddress}
          lat={lat}
          lng={lng}
          text={state?.selectedAddress?.name}
        />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
