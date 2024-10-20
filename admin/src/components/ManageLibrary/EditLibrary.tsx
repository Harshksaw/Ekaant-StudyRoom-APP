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
  description: string;
  images: string[];
  rooms: Room[];
}

const EditLibrary = ({ libraryId }: { libraryId: string }) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [longdescription, setLongDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

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
    try {
      const response = await axios.put(`${BASEURL}/api/library/${LibraryId.id}`, {
        name,
        description,
        images,
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
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='images'>
          Images
        </label>
        <input
          id='images'
          type='text'
          value={images.join(', ')}
          onChange={(e) => setImages(e.target.value.split(', '))}
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