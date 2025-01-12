import axios from "axios";
import { BACKEND } from "./config";

const checkPreviousBookings = async (userId, libraryId) => {
    try {
      const response = await axios.post(`${BACKEND}/api/v1/booking/hasBoughtEarlier`, {
        userId,
        libraryId,
      });
      return response.data.hasBookedEarlier;
    } catch (error) {
      console.error('Error checking previous bookings:', error);
      return false;
    }
  };

  export { checkPreviousBookings };