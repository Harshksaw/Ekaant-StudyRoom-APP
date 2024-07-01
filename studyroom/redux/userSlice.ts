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

const initialState: any = {
 data: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<any>) {
      state.details = action.payload;
    },
    // Optionally, add more reducers here for individual updates if needed
  },
});

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;