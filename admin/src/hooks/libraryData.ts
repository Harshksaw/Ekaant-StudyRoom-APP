import { BASEURL } from "@/lib/utils";
import axios from "axios";




async function getLibraryDataById() {
  const userId = localStorage.getItem("userId");
  const response = await axios.post(`${BASEURL}/api/v1/library/getAdminLibraries`, {
    userId : userId,

  })
  const data = await response;
  return data;
}

async function getApprovedLibraries() {
  const response = await axios.get(`${BASEURL}/api/v1/library/getApprovedLibraries`)
  const data = await response;
  return data;
}

async function getBookings() {
  const response = await axios.get(`${BASEURL}/api/v1/booking/getBookings`);
  return response;
}

export { getLibraryDataById, getApprovedLibraries, getBookings };