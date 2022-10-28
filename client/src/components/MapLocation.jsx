import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const MapLocation = ({ detailInfo }) => {
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: parseFloat(detailInfo.coordinates.latitude),
        lng: parseFloat(detailInfo.coordinates.longitude)
    }

    const position = {
        lat: parseFloat(detailInfo.coordinates.latitude),
        lng: parseFloat(detailInfo.coordinates.longitude)
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            <MarkerF
                position={position}
            />
        </GoogleMap>
    )
}

export default MapLocation;