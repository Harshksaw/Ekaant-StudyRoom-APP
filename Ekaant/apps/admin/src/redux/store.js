import { configureStore } from '@reduxjs/toolkit'
import libraryReducer from './libraryslice'

export const store = configureStore({
  reducer: {
        library: libraryReducer,

  }
})