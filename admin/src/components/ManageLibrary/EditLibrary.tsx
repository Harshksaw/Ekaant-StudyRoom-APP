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
    cardImage: string;
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
  interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  }
  
const EditLibrary = () => {


    const [cardImage, setCardImage] = useState<any>(null);
    const [images, setImages] = useState<any>([]);


  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [longdescription, setLongDescription] = useState<string>('');
  const [registrationFees, setRegistrationFees] = useState<number>(0);
  const [address, setAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

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

        setLibrary(response.data.data);
        setName(response.data.data.name);
        setDescription(response.data.data?.shortDescription);
        setLongDescription(response.data.data?.longDescription);
        setAmenities(response.data.data.amenities);
        setAddress(response.data.data.address);

        // setImages(response.data.images);
      } catch (error) {
        toast.error('Error fetching library data');
        console.error('Error fetching library data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);


 
  const handleUpdateLibrary = async () => {
    setLoading(true);


    const payload = {
      libraryId: LibraryId.id,
      name,
      shortDescription: description,
      longDescription: longdescription,
      amenities,
      address,
      registrationFees
    };

    try {
      const response = await axios.post(`${BASEURL}/api/v1/library/updateAdminLibrary`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.status === 200) {
        toast.success('Library updated successfully');

        setLibrary(response.data);
      }

    } catch (error) {
      toast.error('Error updating library');
      console.error('Error updating library:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const updateLibraryImages = async () => {
    setLoading(true);
    const formData = new FormData();


    if (cardImage) {
        formData.append('cardImage', cardImage);
      }
  
      if (images.length > 0) {
        images.forEach((image: string | Blob) => {
          formData.append('images', image);
        });
      }
    try {
      const response = await axios.post(`${BASEURL}/api/v1/library/updateLibraryImage/${LibraryId.id}`, formData);
      if(response.status === 200) {

          toast.success('Images updated successfully');
        }
        setLibrary(response.data.data);

    } catch (error) {
      toast.error('Error updating images');
      // console.error('Error updating images:', error);r
    } finally {
      setLoading(false);
    }
  }
  const handleDeleteRoom = async (roomId: string) => {
    // console.log("🚀 ~ handleDeleteRoom ~ roomId:", roomId)
    setLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/api/v1/library/deleteRoomLib`,{

        libraryId : LibraryId.id, 
        roomId
      });

      setLibrary(res.data.data);
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



  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
     
        setImages((prevImages: any) => [...prevImages, ...files]);
      }
    }
  };

  return (
    <div className='w-full h-full flex-1 p-6'>
      <h2 className='text-2xl font-bold mb-4'>Edit Library</h2>


      <div>


      <div className='mb-6'>
        <label className='flex flex-row justify-center items-center text-gray-700 text-sm font-bold mb-2' htmlFor='cardImage'>
          Card Image
        </label>
        {library.cardImage && <img src={library.cardImage} alt='Card' className='mb-4 w-96 h-72' />}
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
        <p>Upto 5 Images only</p>
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
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-10'
      onClick={updateLibraryImages}>
            Update ImageS
        </button>

      </div>


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

        {
          !amenities && <p className='text-2xl bg-red-500'>No Amenities</p>
        }
         {amenities &&      Object.keys(amenities).map((amenity) => (
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
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='line1'>
          Address Line 1
        </label>
        <input
          id='line1'
          name='line1'
          type='text'
          value={address.line1}
          onChange={handleAddressChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='line2'>
          Address Line 2
        </label>
        <input
          id='line2'
          name='line2'
          type='text'
          value={address.line2}
          onChange={handleAddressChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='city'>
          City
        </label>
        <input
          id='city'
          name='city'
          type='text'
          value={address.city}
          onChange={handleAddressChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='state'>
          State
        </label>
        <input
          id='state'
          name='state'
          type='text'
          value={address.state}
          onChange={handleAddressChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='pincode'>
          Pincode
        </label>
        <input
          id='pincode'
          name='pincode'
          type='text'
          value={address.pincode}
          onChange={handleAddressChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='pincode'>
         Registration Fees
        </label>
        <input
          id='registration'
          name='registration'
          type='number'
          value={registrationFees}
          onChange={(e)=>setRegistrationFees(e.target.value)}
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
          <div key={room.id} className='flex justify-between items-center p-4 border rounded'>
            <span>Room {room.roomNo}</span>
            <button
              onClick={() => handleDeleteRoom(room.id)}
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