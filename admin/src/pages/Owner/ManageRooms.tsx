import React from 'react'
import { useParams } from 'react-router-dom'
import {BASEURL} from '../../lib/utils'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

interface Room {
    name: string;
    _id: string;
    approved: boolean;
  }
const ManageRooms = () => {
    const {lib_id} = useParams()
    const [room, setRoom] = React.useState<Room | null>(null);
    const navigate = useNavigate()
    React.useEffect(() => {
        const func = async()=> {
            const res = await  axios.post(`${BASEURL}/api/v1/library/getLibraryById`,{id: lib_id})
            if(res.data.success){
                console.log(res?.data)
                setRoom(res?.data?.data)
            }
        }
       func()
       
    },[lib_id, room?.approved]);

    const handleApprove = async (id: string, status: boolean) => {
        const res = await axios.post(`${BASEURL}/api/v1/library/updateStatus`, {id, status: !status});
        if (res.data.success) {
            console.log(res?.data);
            setRoom(res?.data?.data);
        }
    };
    console.log(room)
  return (
    <div className='p-8 flex flex-col gap-4'>
    {room && (
        <div className={'flex gap-4 py-2 px-8 bg-blue-100 w-fit'}>
            <p className='bg-blue-400 py-1 px-3 rounded-md'>{room.name}</p>
            <button onClick={() => navigate(`/admin/manage-rooms/${room._id}`)}>
                <p className='bg-blue-400 py-1 px-3 rounded-md'>{room._id}</p>
            </button>
            <button onClick={() => handleApprove(room._id, room.approved)} className="px-4 rounded-xl">
                {room.approved ? 'approved' : 'approve'}
            </button>
        </div>
    )}
</div>
  )
}

export default ManageRooms
