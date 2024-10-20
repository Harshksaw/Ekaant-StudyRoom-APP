import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASEURL } from '@/lib/utils';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from 'react-router-dom';

interface Room {
  _id: string;
  roomNo: number;
}
interface Library {
    _id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    cardimage: string;
    images: string[];
    amenities: Amenities;
    rooms: Room[];
  }
interface Amenities {
    CommonParking: boolean;
    FloorMat: boolean;
    LunchArea: boolean;
    MovingChair: boolean;
    News: boolean;
    SeparateParking: boolean;
    ac: boolean;
    coldWater: boolean;
    discussionArea: boolean;
    locker: boolean;
    separateWashroom: boolean;
    wifi: boolean;
  }
const EditLibrary = ({ libraryId }: { libraryId: string }) => {
    const [cardImage, setCardImage] = useState<any>(null);
    const [images, setImages] = useState<any>([]);


  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [longdescription, setLongDescription] = useState<string>('');

  const [amenities, setAmenities] = useState<Amenities>({
    CommonParking: false,
    FloorMat: false,
    LunchArea: false,
    MovingChair: false,
    News: false,
    SeparateParking: false,
    ac: false,
    coldWater: false,
    discussionArea: false,
    locker: false,
    separateWashroom: false,
    wifi: false,
  });
  const LibraryId = useParams();


  useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASEURL}/api/v1/library/getLibraryById`, {
            id : LibraryId.id
        });
        console.log("🚀 ~ fetchLibrary ~ response:", response.data.data)
        setLibrary(response.data.data);
        setName(response.data.data.name);
        setDescription(response.data.data?.shortDescription);
        setLongDescription(response.data.data?.longDescription);
        setAmenities(response.data.data.amenities);
        // setImages(response.data.images);
      } catch (error) {
        toast.error('Error fetching library data');
        console.error('Error fetching library data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [libraryId]);

  const handleUpdateLibrary = async () => {
    setLoading(true);


    const formData = new FormData();
    formData.append('name', name);
    formData.append('shortDescription', description);
    formData.append('longDescription', longdescription);
    formData.append('amenities', JSON.stringify(amenities));

    formData.append('libraryId', libraryId);
    try {


        console.log(formData, "formData")
        // if (cardImage) {
        //   formData.append('cardImage', cardImage);
        // }
  
        // if (images && images.length > 0) {
        //     images.forEach((image, index) => {
        //       formData.append('images', image);
        //     });
        //   }
          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        const response = await axios.post(`${BASEURL}/api/v1/library/UpdateLibrary`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      setLibrary(response.data);
      toast.success('Library updated successfully');
    } catch (error) {
      toast.error('Error updating library');
      console.error('Error updating library:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${BASEURL}/api/library/${libraryId}/room/${roomId}`);
      setLibrary((prevLibrary) => {
        if (!prevLibrary) return null;
        return {
          ...prevLibrary,
          rooms: prevLibrary.rooms.filter((room) => room._id !== roomId),
        };
      });
      toast.success('Room deleted successfully');
    } catch (error) {
      toast.error('Error deleting room');
      console.error('Error deleting room:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ClipLoader color='#4A90E2' size={50} />
      </div>
    );
  }

  if (!library) {
    return <div className=''>Library not found</div>;
  }
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked,
    }));
  };
  const handleCardImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCardImage(e.target.files[0]);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.map((file) => URL.createObjectURL(file)); // Create image URLs for preview
    setImages((prevImages) => prevImages.concat(imageFiles)); // Add new images to the existing state
  };
  return (
    <div className='w-full h-full flex-1 p-6'>
      <h2 className='text-2xl font-bold mb-4'>Edit Library</h2>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
          Name
        </label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
          Short Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
    <div className='mb-6'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='longdescription'>
        Long Description
      </label>
      <textarea
        id='longdescription'
        value={longdescription}
        onChange={(e) => setLongDescription(e.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
    </div>

    <div className='mb-6'>
        <h3 className='text-lg font-bold mb-2'>Amenities</h3>
        {Object.keys(amenities).map((amenity) => (
          <div key={amenity} className='flex items-center mb-2'>
            <input
              id={amenity}
              name={amenity}
              type='checkbox'
              checked={amenities[amenity as keyof Amenities]}
              onChange={handleAmenityChange}
              className='mr-2 leading-tight'
            />
            <label htmlFor={amenity} className='text-gray-700'>
              {amenity}
            </label>
          </div>
        ))}
      </div>
    
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cardImage'>
          Card Image
        </label>
        {library.cardimage && <img src={library.cardimage} alt='Card' className='mb-4 w-96 h-72' />}
        <input
          id='cardImage'
          type='file'
          onChange={handleCardImageChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='images'>
          Images
        </label>
        <div className='grid grid-cols-2 gap-4 border border-1 border-gray-800'>

        {library.images.map((image, index) => (
            <img key={index} src={image} alt={`Library ${index}`} className='mb-4 w-60 h-60' />
        ))}
        </div>
        <input
          id='images'
          type='file'
          multiple
          onChange={handleImageChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>


      <button
        onClick={handleUpdateLibrary}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Update Library
      </button>

      <h3 className='text-xl font-bold mt-8 mb-4'>Rooms</h3>
      <div className='grid grid-cols-1 gap-4'>
        {library?.rooms?.map((room) => (
          <div key={room._id} className='flex justify-between items-center p-4 border rounded'>
            <span>Room {room.roomNo}</span>
            <button
              onClick={() => handleDeleteRoom(room._id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditLibrary;