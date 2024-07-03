GOURISH -Admin build npm run buil reslove all remove uncessary imports 
admin
https://obscure-bassoon-v7xj95ggv9phwwr-5173.app.github.dev/




BACKEND -

https://obscure-bassoon-v7xj95ggv9phwwr-3000.app.github.dev




DB - 
mongodb+srv://indianshahishere:OTzra2mFL0l1Ry3S@studyroom.e604xri.mongodb.net/?retryWrites=true&w=majority




import React, { useState } from 'react';
import axios from 'axios';

  const [libraryOwnerId, setLibraryOwnerId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

    const formData = new FormData();
    formData.append('libraryOwnerId', libraryOwnerId);
    formData.append('name', name);
    formData.append('image', image);

    const jsonData = {
      description,
      location,
      price,
      amenities: ['Wi-Fi', 'Coffee'], // Or get from UI elements
      seatLayout: [
        [1, 1, 0, 1],
        [1, 1, 1, 1]
      ],
      timeSlot: {
        start: "09:00",
        end: "17:00"
      }
    };

---------------------------------------------------------------------------
      const response = await axios.post('/upload-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: JSON.stringify(jsonData)
      })
---------------------------------------------------------------------------
