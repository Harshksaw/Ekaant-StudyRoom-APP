import { BACKEND } from "@/utils/config"
import axios from "axios"


export const fetchRoomData = async () => {

    const response = await axios.get(`${BACKEND}/api/v1/library/getLibrary`)
        console.log(response.data)
    return response.data

  }