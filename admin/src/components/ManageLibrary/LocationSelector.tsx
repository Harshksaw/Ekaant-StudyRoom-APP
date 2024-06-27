import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationSelector = () => {
  useEffect(() => {
    // Ask the user if they want to share their location
    const askForLocation = () => {
      if (window.confirm("Do you want to share your location?")) {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation([
                position.coords.latitude,
                position.coords.longitude,
              ]);
              console.log(
                "Got location: ",
                position.coords.latitude,
                position.coords.longitude
              );
            },
            (error) => {
              console.error("Error getting location: ", error);
              // Handle error or set a default position if desired
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
          // Handle case where geolocation is not supported
        }
      }
    };

    askForLocation();
  }, []);
  const [location, setLocation] = useState<[number, number]>([
    position[0],
    position[1],
  ]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={position as [number, number]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationSelector;
