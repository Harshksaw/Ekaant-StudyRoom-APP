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

interface UserDetails {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
}
const initialState: any = {
  isAuthenticated: false,
  user: null,
  token: null,
  bookingsForFriend: false,
  friendDetails: null,
  details: null,
  selectedLocation: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
    },
    setAuthToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    login(state, action: PayloadAction<{ user: UserDetails; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setFriendDetails(state, action: PayloadAction<{ friendDetails: FriendDetails; bookingForSelf: boolean }>) {
      if (action.payload.bookingForSelf) {
        state.friendDetails = null;
        state.bookingsForFriend = false;
      } else {
        state.friendDetails = action.payload.friendDetails;
        state.bookingsForFriend = true;
      }
    },
    toggleBookingForFriend(state) {
      if (!state.friendDetails) {
        console.log('Friend details are required to book for a friend.');
      } else {
        state.bookingsForFriend = !state.bookingsForFriend;
      }
    },

    resetUserState(state) {
      state.data = null;
      state.bookingsForFriend = false;
      state.friendDetails = null;
      state.details = null;
      state.selectedLocation = null;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setSelectedLocation(state, action: PayloadAction<string>) {
      state.selectedLocation = action.payload;
    },
    
    

  },
});

export const { setUserDetails, setFriendDetails,resetUserState , login, logout} = UserSlice.actions;

export default UserSlice.reducer;