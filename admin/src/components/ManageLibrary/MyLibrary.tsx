import { getLibraryDataById } from '@/hooks/libraryData';
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
export function BadgeDestructive() {
  return <Badge  className='bg-red-600' variant="destructive">Destructive</Badge>
}
export default function MyLibrary() {


  const [data, setData] = useState(null); 

  useEffect(() => {

    const fetchData = async () => {


      const res = await getLibraryDataById();
      console.log(res);
      setData(res.data.data);
      console.log(data);
    }
    fetchData();
  },[])

    // const location = getLocationName(item.location[0], item.location[1])

    
  return (
    <div 
    className='flex flex-col gap-20 p-5 w-full h-full bg-gray-200 rounded-lg shadow-md'
    >
      <div
      
      className='flex flex-col gap-5 w-full h-full
      '>

      {data && data.map((item, index) => (
        <div key={index}
        className='border border-gray-200 p-4 rounded-lg shadow-md bg-white flex flex-row justify-between gap-5 items-center'
        >

          <img src={item.images[0]} alt={item.name} 
          width={200}
          height={200}
          />
          <div>

          <h3>{item.name}</h3>
          <p>{item.description.split("").slice(0,50)}</p>
          <p>Pricing: {item.price}/month</p>
          </div>

          <div>
          <div>

            <div>
             <p>
              
              </p> 
            </div>

          {item.approved ? <Badge  className='bg-red-600' variant="destructive">Approved</Badge> : (<Badge  className='bg-red-600' variant="destructive">NotApproved</Badge>)}
          </div>
          </div>

        </div>
      ))}
      </div>
    </div>
  );
}
