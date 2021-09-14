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
      state.seachedData.push(action.payload);
    },
    getLocalData: (state, action) => {
      state.seachedData.push(...action.payload);
    },
    saveIntoStorage: (state) => {
      localStorage.setItem('cities', JSON.stringify(state.seachedData));
    },
    removeCities: (state, action) => {
      state.seachedData = state.seachedData.filter(
        (city) => city.name !== action.payload
      );
      localStorage.setItem('cities', JSON.stringify(state.seachedData));
    }
  }
});

export const {
  addWeatherObj,
  removeDefObj,
  addSearchcities,
  getLocalData,
  saveIntoStorage,
  removeCities
} = localSlice.actions;

export default localSlice.reducer;
