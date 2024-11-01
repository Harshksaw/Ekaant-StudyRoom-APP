// LibraryPage.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "../ManageLibrary/LocationSelector";

interface Library {
  _id: string;
  name: string;
  shortDescription: string;
  cardImage: string;
  comingSoonMessage: string;
}
const LibraryPage = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    cardImage: null as File | null,
    comingSoonMessage: "",
    location:[],
  });

  // Fetch Libraries
  const fetchLibraries = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/library/getDummyLibrary`
      ); // Adjust endpoint if needed
      console.log("Response:", response.data.dummyLibrary);
      setLibraries(response.data.dummyLibrary);
    } catch (error) {
      console.error("Failed to fetch libraries:", error);
    }
  };

  // Create Library
  const handleCreateLibrary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const formData1 = new FormData();
      formData1.append("name", formData.name);
      formData1.append("shortDescription", formData.shortDescription);
      if (formData.cardImage) {
        formData1.append("cardImage", formData.cardImage);
      }
      formData1.append("comingSoonMessage", formData.comingSoonMessage);
      const res = await axios.post(
        `${BASEURL}/api/v1/library/createDummyLibrary`,
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", res.data);
      setFormData({
        name: "",
        shortDescription: "",
        cardImage: null as File | null,
        comingSoonMessage: "",
      });
      fetchLibraries();
    } catch (error) {
      console.error("Failed to create library:", error);
    }
  };

  // Delete Library
  const handleDeleteLibrary = async (id: string) => {
    try {
      await axios.delete(`${BASEURL}/api/v1/library/deleteDummyLibrary/${id}`);
      fetchLibraries();
    } catch (error) {
      console.error("Failed to delete library:", error);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);
  const handleLocationSelect = (location: any) => {

    setFormData({...formData, location});
  };
  console.log("Location:", formData.location);
  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      {/* Form Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-md mr-4">
        <h2 className="text-2xl font-semibold mb-6">Create New Library</h2>
        <form onSubmit={handleCreateLibrary} className="space-y-4 flex  flex-col gap-10 overflow-y-scroll">
          <input
            type="text"
            placeholder="Library Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
          <textarea
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
  <input
            type="file"
            placeholder="Card Image URL"
            // value={formData.cardImage}
            onChange={(e) => {
              const file = e.target.files?.[0];
              // setFormData({ ...formData, cardImage: e.target.files?.[0] });
              if (file) {
                // const imageUrl = URL.createObjectURL(file);
                // console.log("Image URL:", imageUrl);
                setFormData({ ...formData, cardImage: file });
              }
            }}
            className="w-full p-2 border border-gray-300 mt-20 rounded-md focus:outline-none focus:border-indigo-500"
          />
<div className=" w-full h-96 mt-20 mb-32 flex justify-center items-center rounded-lg">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>

        
          <textarea
            placeholder="Coming Soon Message"
            value={formData.comingSoonMessage}
            onChange={(e) =>
              setFormData({ ...formData, comingSoonMessage: e.target.value })
            }
            className="w-full p-2 border mt-32 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />


          <button
            type="submit"
            className="w-full bg-blue-600 mt-60 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Library
          </button>
        </form>
      </div>

      {/* Library List Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Library List</h2>
        {libraries?.length > 0 ? (
          libraries.map((library) => (
            <div
              key={library?._id}
              className="flex justify-between items-center p-4 mb-4 border-b border-gray-200"
            >
              <div>
                <h3 className="text-xl font-semibold">{library?.name}</h3>
                <p className="text-gray-600">{library?.shortDescription}</p>
              </div>
              <button
                onClick={() => handleDeleteLibrary(library?._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No libraries found.</p>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
