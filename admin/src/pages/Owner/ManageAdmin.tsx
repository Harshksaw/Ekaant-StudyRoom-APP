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
  return (
    <div className='p-8 flex flex-col gap-4'>
        {
            library.map((lib:Lib) => (
                <div className={'flex gap-4 py-2 px-8 bg-blue-100 w-fit'}>
                     <p className='bg-blue-400 py-1 px-3 rounded-md'>{lib.name}</p>
                        
                     <button onClick={()=> navigate(`/admin/manage-rooms/${lib._id}`)}>
                     <p className='bg-blue-400 py-1 px-3 rounded-md'>{lib._id}</p>
                     </button>
                </div>
            ))
        }
      
    </div>
  )
}

export default ManageAdmin
