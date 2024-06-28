import axios from "axios"

const BASEURL = 'http://127.0.0.1:3000'
export const fetchRoomData = async () => {

    const response = await axios.get(`${BASEURL}/api/v1/library/getLibrary`)
        console.log(response.data)
    return response.data

  }