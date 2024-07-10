import { setFriendDetails } from "@/redux/userSlice";
import { duration } from "moment";
import { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";

export const ToggleBookingButton = () => {
    const [bookingForSelf, setBookingForSelf] = useState(true); // Default to booking for self
    const dispatch = useDispatch();
    // Move the useSelector hooks outside of the toggleBooking function to avoid errors
    const bookingsForFriend = useSelector(state => state.user.bookingsForFriend);
    const friendDetails = useSelector(state => state.user.friendDetails);
    const toggleBooking = () => {
      // Directly check if friendDetails is null
      if (friendDetails === null) {
          console.log("Cannot proceed with booking without friend details.");
          // Assuming there's a function to update the button title or similar UI element
          setBookingForSelf(false); 
          Toast.show("Please Select Friend Frist.", { type: "danger" , duration: 2000 });
          return; // Exit the function to prevent further execution
      }
  
      // Check if trying to book for a friend and friendDetails are empty
      if (!bookingForSelf && (!friendDetails || Object.keys(friendDetails).length === 0)) {
        Toast.show("Friend details are empty. Cannot toggle.", { type: "danger" , duration: 2000 });

          // Optionally, reset to booking for self if needed
          setBookingForSelf(true); // Reset to booking for self
          return; // Exit the function to prevent toggling and dispatching
      }
  
      setBookingForSelf(!bookingForSelf); // Toggle the state
  
      // Dispatch the action with the updated state
      dispatch(setFriendDetails({ friendDetails, bookingForSelf: !bookingForSelf }));
  };

    return (
        <View>
            <Button
                title={bookingForSelf ? "Book for a Friend" : "Book for Myself"}
                onPress={toggleBooking}
            />
        </View>
    );
};

export default ToggleBookingButton;