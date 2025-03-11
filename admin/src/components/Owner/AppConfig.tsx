import { BASEURL } from "@/lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const BannerUploadForm = () => {
  const [banners, setBanners] = useState<string[] | null[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [libraries, setLibraries] = useState<any[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<any[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const getImages = async () => {
    try {
      const res = await axios.get(`${BASEURL}/api/v1/app/getApp?banner=true`);
      setBanners((prev) =>
        prev.map((_, ind) => res.data.data.Banner[ind] ?? null)
      );
      setSelectedLibrary(JSON.parse(res.data.data.actionId));
    } catch (error) {
      console.error("Failed to fetch banner image data:", error);
    }
  };

  const getLibrary = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/library/fetch-all-library-admin`
      );

      setLibraries(response.data.libraries);
    } catch (error) {}
  };

  useEffect(() => {
    getLibrary();
    getImages();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();

    let imageSelection = "";
    banners.map((item, ind) => {
      if (item && typeof item !== "string" && item !== "") {
        const img = item[0];
        formData.append("banner", img);
        imageSelection += ind;
      }
    });

    formData.append("selection", imageSelection);

    formData.append("libraries", JSON.stringify(selectedLibrary));

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/app/editBanner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Banners uploaded successfully");
        getImages();
      }
    } catch (error) {
      toast.error(error.message || "Banners uploaded successfully");
      console.error("Error uploading banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: number) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${BASEURL}/api/v1/app/delete-banner/${id}`
      );
      if (res.status === 200) {
        getImages();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, index: number) => {
    const newFile = Array.from(e.target.files);
    if (newFile.length) {
      setBanners((prev) => {
        const newSliderImages = [...prev];
        newSliderImages[index] = newFile;
        return newSliderImages;
      });
    }
  };

  return (
    <div className="flex  items-center justify-center bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-2 w-full flex flex-col justify-center items-center"
      >
        <div className="mb-6 w-full">
          <label
            htmlFor="carouselImages"
            className="block text-xl font-medium text-black mb-3 text-center"
          >
            Carousel Images
          </label>

          <div className="flex gap-2 ">
            {banners.map((item, ind) => {
              const file = item
                ? typeof item === "string"
                  ? item
                  : URL.createObjectURL(item[0])
                : null;
              return (
                <div key={ind} className="w-full">
                  <div className="flex flex-col items-center justify-center  relative">
                    {typeof item === "string" && (
                      <button
                        onClick={() => deleteImage(ind)}
                        type="button"
                        className="absolute top-0 right-0 z-20 bg-[#ff0000] p-1 rounded"
                      >
                        <RiDeleteBinLine color="#fff" />
                      </button>
                    )}
                    <label
                      htmlFor={`dropzone-file-${ind}`}
                      className="flex flex-col overflow-hidden size-full items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {file ? (
                        <img
                          className="size-full object-contain"
                          src={file}
                          alt={`preview-${ind}`}
                        />
                      ) : (
                        <div className="flex px-2 py-4 flex-col items-center justify-center">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-1 text-xs text-center text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            {/* or drag and drop */}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG
                          </p>
                        </div>
                      )}
                      <input
                        id={`dropzone-file-${ind}`}
                        type="file"
                        multiple
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, ind)}
                      />
                    </label>
                  </div>
                  <select
                    id="countries"
                    onChange={({ target }) =>
                      setSelectedLibrary((prev) => {
                        const newArray = [...prev]; // Create a copy of the previous array
                        newArray[ind] = +target.value; // Update the element at the specified index
                        return newArray; // Return the updated array
                      })
                    }
                    className=" mt-3 border text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-[.3rem]  bg-white border-gray-400 rounded-[5px] "
                  >
                    <option value="">Select Library</option>

                    {libraries.map((item) => (
                      <option
                        value={item.id}
                        selected={item.id === selectedLibrary[ind]}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        {/* <div
          {...getRootPropsBanner()}
          className="dropzone border-dashed border-2 flex flex-row border-gray-300 p-4 
        text-center mb-4 rounded-md hover:bg-gray-50"
        >
          <input {...getInputPropsBanner()} />
          {banners.length > 0 ? (
            <div className="flex ">
              {banners.map((file, index) => (
                <div key={index} className="mb-2">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-60 h-auto mb-2 rounded-md"
                  />
                  <p className="text-gray-600">{file.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Drag 'n' drop banner images here, or click to select multiple
            </p>
          )}
        </div> */}
        <button
          disabled={loading}
          type="submit"
          className="w-96 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-70 flex gap-3 justify-center"
        >
          {loading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

const LocationForm1 = () => {
  const [location, setLocation] = useState<any>("");
  const [locationImage, setLocationImage] = useState<any>(null);
  const [locations, setLocations] = useState<any>([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/app/getLocations`);
      setLocations(response.data.data);
      console.log(
        "🚀 ~ fetchLocations ~ response.data.data:",
        response.data.data
      );
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${BASEURL}/api/v1/app/getLocations/${id}`
      );
      if (res.status === 200) {
        toast.success("Location deleted successfully");
        fetchLocations();
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const onDropLocationImage = (acceptedFiles: any[]) => {
    setLocationImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("locationImage", locationImage);

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/app/editLocations`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Location added successfully");
        fetchLocations();
      }
      console.log("Location added successfully:", response.data);
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const {
    getRootProps: getRootPropsLocationImage,
    getInputProps: getInputPropsLocationImage,
  } = useDropzone({
    onDrop: onDropLocationImage,
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4"
      >
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
            <p className="text-gray-500">
              Drag 'n' drop a location image here, or click to select one
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 mb-32 md:mt-0 max-h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Locations</h2>
        <ul className="space-y-4 pb-20">
          {locations.map((location: any) => (
            <li
              key={location.id}
              className="flex justify-between items-center mb-4 pb-5"
            >
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
                <button
                  onClick={() => handleDelete(location.id)}
                  className="text-red-500 hover:text-red-700"
                >
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
  const [activeTab, setActiveTab] = useState<"banner" | "location">("banner");

  return (
    <div className="overflow-y-hidden h-screen ">
      <h1 className="text-3xl font-bold text-center my-2 ">Admin Panel</h1>
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "banner"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("banner")}
        >
          Banner Upload
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "location"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("location")}
        >
          Location Management
        </button>
      </div>
      <div className="flex-grow flex-1">
        {activeTab === "banner" && <BannerUploadForm />}
        {activeTab === "location" && <LocationForm1 />}
      </div>
    </div>
  );
};

export default LocationForm;
