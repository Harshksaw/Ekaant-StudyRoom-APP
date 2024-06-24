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
  details: {
    seat: null,
    date: null,
    months: null,
    slot: null,
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails(state, action: PayloadAction<any>) {
      state.details = action.payload;
    },
    // Optionally, add more reducers here for individual updates if needed
  },
});

export const { setBookingDetails } = bookingSlice.actions;

export default bookingSlice.reducer;