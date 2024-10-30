// LibraryPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";

const LibraryPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    cardImage: "",
    comingSoonMessage: ""
  });

  // Fetch Libraries
  const fetchLibraries = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/library/getDummyLibrary`); // Adjust endpoint if needed
      setLibraries(response.data.data);
    } catch (error) {
      console.error("Failed to fetch libraries:", error);
    }
  };

  // Create Library
  const handleCreateLibrary = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASEURL}/api/v1/library/createDummyLibrary`, formData);
      setFormData({ name: "", shortDescription: "", cardImage: "", comingSoonMessage: "" });
      fetchLibraries();
    } catch (error) {
      console.error("Failed to create library:", error);
    }
  };

  // Delete Library
  const handleDeleteLibrary = async (id) => {
    try {
      await axios.delete(`${BASEURL}/api/libraries/getDummyLibrary/${id}`);
      fetchLibraries();
    } catch (error) {
      console.error("Failed to delete library:", error);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      {/* Form Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-md mr-4">
        <h2 className="text-2xl font-semibold mb-6">Create New Library</h2>
        <form onSubmit={handleCreateLibrary} className="space-y-4">
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
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Card Image URL"
            value={formData.cardImage}
            onChange={(e) => setFormData({ ...formData, cardImage: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="Coming Soon Message"
            value={formData.comingSoonMessage}
            onChange={(e) => setFormData({ ...formData, comingSoonMessage: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Library
          </button>
        </form>
      </div>

      {/* Library List Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Library List</h2>
        {libraries.length > 0 ? (
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
