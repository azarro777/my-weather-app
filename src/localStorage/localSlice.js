import { createSlice } from '@reduxjs/toolkit';

export const localSlice = createSlice({
  name: 'local',
  initialState: {
    defData: [],
    seachedData: []
  },
  reducers: {
    addWeatherObj: (state, action) => {
      state.defData = action.payload;
    },

    removeDefObj: (state) => {
      state.defData = [];
    },
    addSearchcities: (state, action) => {
      state.seachedData = action.payload;
    }
  }
});

export const { addWeatherObj, removeDefObj, addSearchcities } =
  localSlice.actions;

export default localSlice.reducer;
