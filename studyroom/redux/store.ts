// store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;