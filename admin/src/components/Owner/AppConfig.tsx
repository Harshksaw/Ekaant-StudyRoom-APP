import { BASEURL } from "@/lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { FaEdit, FaTrash } from "react-icons/fa";


interface BannerFile extends File {
  preview: string;
}
const BannerUploadForm = () => {
  const [banners, setBanners] = useState<BannerFile[]>([]);

  const onDropBanner = (acceptedFiles: any[]) => {
    setBanners(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  const handleSubmit = async (e:any) => {
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
        toast.success("Banners uploaded successfully");

      }
      console.log('Banners uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading banners:', error);
    }
  };

  const { getRootProps: getRootPropsBanner, getInputProps: getInputPropsBanner } = useDropzone({
    onDrop: onDropBanner,

    multiple: true, // Allow multiple files
  });

  return (
    <div className="flex  items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-2 w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Banners</h2>
        <div {...getRootPropsBanner()} className="dropzone border-dashed border-2 flex flex-row border-gray-300 p-4 
        text-center mb-4 rounded-md hover:bg-gray-50">
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
  const [location, setLocation] = useState<any>('');
  const [locationImage, setLocationImage] = useState<any>(null);
  const [locations , setLocations] = useState<any>([]);

  const [editingLocation, setEditingLocation] = useState<any>(null);
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/app/getLocations`);
      setLocations(response.data.data);
      console.log("🚀 ~ fetchLocations ~ response.data.data:", response.data.data)
      
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${BASEURL}/api/v1/app/getLocations/${id}`);
      if(res.status === 200){
        toast.success("Location deleted successfully");
        fetchLocations();
      }
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  const onDropLocationImage = (acceptedFiles: any[]) => {
    setLocationImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', location);
    formData.append('locationImage', locationImage);


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

  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editingLocation ? 'Edit Location' : 'Add New Location'}
      </h2>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700">
          City Name:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div
        {...getRootPropsLocationImage()}
        className="border-dashed border-2 border-gray-300 p-4 text-center mb-4 rounded-md hover:bg-gray-50"
      >
        <input {...getInputPropsLocationImage()} />
        {locationImage ? (
          <p className="text-gray-600">{locationImage.name}</p>
        ) : (
          <p className="text-gray-500">Drag 'n' drop a location image here, or click to select one</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {editingLocation ? 'Update Location' : 'Add Location'}
      </button>
    </form>
  
    <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 mb-32 md:mt-0 max-h-[800px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Locations</h2>
      <ul className="space-y-4">
        {locations.map((location: any) => (
          <li key={location.id} className="flex justify-between items-center mb-4 pb-5">
            <div className="flex flex-row-reverse justify-between items-center gap-4"> 
              <p className="text-gray-700">{location.location}</p>
              {location.locationImage && (
                <img
                  src={location.locationImage}
                  alt={location.name}
                  className="w-32 h-32 object-cover mt-2 rounded-md"
                />
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleDelete(location._id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  

  );
};




const LocationForm = () => {
  const [activeTab, setActiveTab] = useState<'banner' | 'location'>('banner');

  return (
    <div className="overflow-y-hidden h-screen ">
      <h1 className="text-3xl font-bold text-center my-2 ">Admin Panel</h1>
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'banner' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('banner')}
        >
          Banner Upload
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'location' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('location')}
        >
          Location Management
        </button>
      </div>
      <div className="flex-grow flex-1">
        {activeTab === 'banner' && <BannerUploadForm />}
        {activeTab === 'location' && <LocationForm1 />}
      </div>
    </div>

  );
};

export default LocationForm;