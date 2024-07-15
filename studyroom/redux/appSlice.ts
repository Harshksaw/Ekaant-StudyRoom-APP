import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  banners: [],
  locations: []
};

const appSlice = createSlice({
  name: 'appDetails',
  initialState,
  reducers: {
    setAppDetails(state, action: PayloadAction<any>) {
      state = action.payload;
    },
    // Optionally, add more reducers here for individual updates if needed
  },
});

export const { setAppDetails } = appSlice.actions;

export default appSlice.reducer;