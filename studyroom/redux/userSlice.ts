import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface BookingDetails {
//   selectedSeat: string | null;
//   selectedDate: string | null;
//   selectedNumber: number | null;
//   selectedTimeSlot: string | null;
// }

// interface BookingState {
//   details: BookingDetails;
// }
interface FriendDetails {
  email: string;
  name: string;
  phoneNumber: number;
}
const initialState: any = {
 data: null,
 bookingsForFriend: false,

friendDetails: null,
details: null,
selectedLocation: null,

  
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<any>) {
      state.details = action.payload;
    },    
    setFriendDetails(state, action: PayloadAction<{ friendDetails: FriendDetails, bookingForSelf: boolean }>) {
      if (action.payload.bookingForSelf) {
        state.friendDetails = null; // Use null for consistency
        state.bookingsForFriend = false;
      } else {
        state.friendDetails = action.payload.friendDetails;
        state.bookingsForFriend = true;
      }
    },
    toggleBookingForFriend(state) {
      // If there are no friend details and trying to book for a friend, log a message
      if (!state.friendDetails) {
        console.log("Friend details are required to book for a friend.");
      } else {
        // Toggle the bookingsForFriend state
        state.bookingsForFriend = !state.bookingsForFriend;
      }
    },
    resetUserState(state) {
      state.data = null;
      state.bookingsForFriend = false;
      state.friendDetails = null;
      state.details = null;
    },
    setSelectedLocation(state, action: PayloadAction<string>) {
      state.selectedLocation = action.payload;
    },
    
    

  },
});

export const { setUserDetails, setFriendDetails,resetUserState } = UserSlice.actions;

export default UserSlice.reducer;