import { BASEURL } from "@/lib/utils";
import { Toast } from "@radix-ui/react-toast";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';



const BannerUploadForm = () => {
  const [banners, setBanners] = useState([]);

  const onDropBanner = (acceptedFiles) => {
    setBanners(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
  
    banners.forEach((file) => {
      formData.append('banner', file); // Append each file under the same field name 'banner'
    });
    try {
      const response = await axios.post(`${BASEURL}/api/v1/app/editBanner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response.status === 200){
      Toast.show('Banners uploaded successfully');

      }
      console.log('Banners uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading banners:', error);
    }
  };

  const { getRootProps: getRootPropsBanner, getInputProps: getInputPropsBanner } = useDropzone({
    onDrop: onDropBanner,
    accept: ['image/*'],
    multiple: true, // Allow multiple files
  });

  return (
    <div className="flex  items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-2 w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Banners</h2>
        <div {...getRootPropsBanner()} className="dropzone border-dashed border-2 flex flex-row border-gray-300 p-4 text-center mb-4 rounded-md hover:bg-gray-50">
          <input {...getInputPropsBanner()} />
          {banners.length > 0 ? (
            <div className="flex ">
              {banners.map((file, index) => (
                <div key={index} className="mb-2">
                  <img src={file.preview} alt={file.name} className="w-60 h-auto mb-2 rounded-md" />
                  <p className="text-gray-600">{file.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Drag 'n' drop banner images here, or click to select multiple</p>
          )}
        </div>
        <button type="submit" className="w-96 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">Upload Banners</button>
      </form>
    </div>
  );
};



const LocationForm1 = () => {
  const [location, setLocation] = useState('');
  const [locationImage, setLocationImage] = useState(null);
  const [coords, setCoords] = useState([0, 0]); // Default coordinates

  const onDropLocationImage = (acceptedFiles) => {
    setLocationImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', location);
    if (locationImage) {
      formData.append('locationImage', locationImage);
    }


    try {
      const response = await axios.post(`${BASEURL}/api/v1/app/editLocations`, formData, {
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

  return (
    <div className="flex items-center justify-center   bg-gray-100 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Location</h2>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">City Name:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
    
        <div {...getRootPropsLocationImage()} className="dropzone border-dashed border-2 border-gray-300 p-4 text-center mb-4 rounded-md hover:bg-gray-50">
          <input {...getInputPropsLocationImage()} />
          {locationImage ? (
            <p className="text-gray-600">{locationImage.name}</p>
          ) : (
            <p className="text-gray-500">Drag 'n' drop a location image here, or click to select one</p>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">Add Location</button>
      </form>
    </div>
  );
};




const LocationForm = () => {
  return (
    <div className="overflow-y-auto h-screen ">
      <h1 className="text-3xl font-bold text-center my-2 ">Admin Panel</h1>
      <div className="flex flex-col  space-y-2">
        <BannerUploadForm />
        <LocationForm1 />
      </div>
    </div>
  );
};

export default LocationForm;