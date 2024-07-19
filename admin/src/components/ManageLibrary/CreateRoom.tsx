import React, { useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '@/lib/utils';

const CreateRoom: React.FC = () => {
    const [libraryId, setLibraryId] = React.useState('');
    const [seatLayout, setSeatLayout] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [timeSlot, setTimeSlot] = React.useState('');
    const [location, setLocation] = React.useState('');

        const createRoom = async () => {
            try {
                const response = await axios.post(`${BASEURL}/api/v1/library/createRoom`, {
                    libraryId:, //leave this we will figure or alter , we might have to send libraryId , when new  Admin is allwoed to create room
                    seatLayout:,
                })


            } catch (error) {
                console.error('Error creating room:', error);
                // Handle error
            }
        };

        const addDetails = async () => {
            try {
                const response = await axios.post(`${BASEURL}/api/v1/library/updateRoom`, {

                 libraryId :, price : , timeSlot : , location  :
                })


            } catch (error) {
                console.error('Error creating room:', error);
                // Handle error
            }
        };




    return <div>Create Room</div>;
};

export default CreateRoom;