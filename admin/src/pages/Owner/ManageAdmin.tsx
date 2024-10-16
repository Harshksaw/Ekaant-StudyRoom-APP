import  { useState,useEffect} from 'react'
import {BASEURL} from '../../lib/utils'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const ManageAdmin = () => {
    const navigate = useNavigate()
    const [library, setLibrary] = useState([]);
    useEffect(() => {
        const func = async()=> {
            const res =await  axios.get(`${BASEURL}/api/v1/library/getLibrary`)
            if(res.data.success){
                setLibrary(res?.data?.data)
            }
        }
       func()
       
    }, []);
    console.log(library)
    interface Lib {
        name: string;
        _id: string;
      }
      console.log(library)
  return (
    <div className='p-3 bg-slate-300 h-full '>
      <table className='min-w-full bg-white'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className='py-2 px-4 border-b'>Library Card Image</th>
            <th className='py-2 px-4 border-b'>Library Name</th>
            <th className='py-2 px-4 border-b'>Owner Name</th>
            <th className='py-2 px-4 border-b'>Location</th>
            <th className='py-2 px-4 border-b'>Approved Status</th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto'>
          {library.map((lib: Lib) => (
            <tr
              key={lib._id}
              className='cursor-pointer hover:bg-gray-100 transition duration-300 justify-center text-center' 
              onClick={() => navigate(`/admin/manage-rooms/${lib._id}`)}
            >
              <td className='py-2 px-4 border-b align-center '>
                <img src={lib?.cardimage} alt={lib.name} className='h-36 w-52 object-cover rounded' />
              </td>
              <td className='py-2 px-4 border-b'>{lib.name}</td>
              <td className='py-2 px-4 border-b'>{lib.libraryOwner.username}</td>
              <td className='py-2 px-4 border-b'>{`${lib.address.city}, ${lib.address.state}`}</td>
              <td className='py-2 px-4 border-b'>{lib.approved ? 'Approved' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageAdmin
