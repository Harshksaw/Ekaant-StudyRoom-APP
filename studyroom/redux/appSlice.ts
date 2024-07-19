import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  locations: string[];
}

const initialState: AppState = {
  locations: [],
};

const appSlice = createSlice({
  name: 'appDetails',
  initialState,
  reducers: {
    setAppDetails(state, action: PayloadAction<string[]>) {
      // Directly update the locations array with the new array of strings
      state.locations = action.payload;
    },
    resetAppState() {
      return initialState;
    },
    // Optionally, add more reducers here for individual updates if needed
  },
  
});

export const { setAppDetails, resetAppState } = appSlice.actions;

export default appSlice.reducer;