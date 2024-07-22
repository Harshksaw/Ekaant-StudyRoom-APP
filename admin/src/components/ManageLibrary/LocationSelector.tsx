import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationSelector = ({ onLocationSelect }: any) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const askForLocation = () => {
    // Step 1: Check Local Storage
    const hasBeenAsked = localStorage.getItem("hasBeenAskedForLocation");

    if (
      !hasBeenAsked &&
      window.confirm("Do you want to share your location?")
    ) {
      // Step 3: Update Local Storage
      localStorage.setItem("hasBeenAskedForLocation", "true");

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);
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

  useEffect(() => {
    askForLocation();
    localStorage.removeItem("hasBeenAskedForLocation");
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null; // Component does not render anything
  };
  const handleSaveLocation = () => {
    if (position) {
      onLocationSelect(position); // Call the callback function passed from the parent component
    } else {
      console.log("No location selected");
    }
  };

  return (
    <div style={{ height: "400px", width: "90%" }} className="flex-col justify-center  items-center">
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapClickHandler />
          {position && (
            <Marker position={position}>

              <Popup>
                You are here! {/* Customize this message as needed */}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      <div className="flex justify-center items-center bg-blue-100">
        {/* Your existing map and location selection UI */}
        <button className=" text-3xl p-2  text-green-800 rounded-md " onClick={handleSaveLocation}>Save Location</button>
      </div>
    </div>
  );
};

export default LocationSelector;