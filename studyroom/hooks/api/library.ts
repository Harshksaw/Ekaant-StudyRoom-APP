import { BACKEND } from "@/utils/config"
import axios from "axios"


export const fetchRoomData = async ({selectedLocation}:any) => {



  
    const response = await axios.post(`${BACKEND}/api/v1/library/getAllLibrary`,{
     city: selectedLocation
    })

    return response.data  }