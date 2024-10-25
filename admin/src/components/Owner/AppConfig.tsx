import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const LocationForm = () => {
  const [location, setLocation] = useState('');
  const [locationImage, setLocationImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [coords, setCoords] = useState([0, 0]); // Default coordinates

  const onDropLocationImage = (acceptedFiles) => {
    setLocationImage(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    setBanner(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', location);
    formData.append('locationImage', locationImage);
    formData.append('banner', banner);
    formData.append('coords', JSON.stringify(coords));

    try {
      const response = await axios.post('http://localhost:3000/api/v1/locations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Location added successfully:', response.data);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const { getRootProps: getRootPropsLocationImage, getInputProps: getInputPropsLocationImage } = useDropzone({
    onDrop: onDropLocationImage,
    accept: 'image/*',
  });

  const { getRootProps: getRootPropsBanner, getInputProps: getInputPropsBanner } = useDropzone({
    onDrop: onDropBanner,
    accept: 'image/*',
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">City Name:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="coords">Coordinates:</label>
        <input
          type="text"
          id="coords"
          value={coords.join(', ')}
          onChange={(e) => setCoords(e.target.value.split(',').map(Number))}
          placeholder="latitude, longitude"
        />
      </div>
      <div {...getRootPropsLocationImage()} className="dropzone">
        <input {...getInputPropsLocationImage()} />
        {locationImage ? (
          <p>{locationImage.name}</p>
        ) : (
          <p>Drag 'n' drop a location image here, or click to select one</p>
        )}
      </div>
      <div {...getRootPropsBanner()} className="dropzone">
        <input {...getInputPropsBanner()} />
        {banner ? (
          <p>{banner.name}</p>
        ) : (
          <p>Drag 'n' drop a banner image here, or click to select one</p>
        )}
      </div>
      <button type="submit">Add Location</button>
    </form>
  );
};

export default LocationForm;