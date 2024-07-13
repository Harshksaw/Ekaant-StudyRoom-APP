import { createSlice } from '@reduxjs/toolkit'

const librarySlice = createSlice({
  name: 'library',
  initialState: [],


  reducers: {
    libraryAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },

  }
})

export const { libraryAdded, todoToggled } = librarySlice.actions
export default librarySlice.reducer