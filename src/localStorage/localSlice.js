import { createSlice } from '@reduxjs/toolkit';

export const localSlice = createSlice({
  name: 'local',
  initialState: {
    defData: [],
    seachedData: [],
    language: ''
  },
  reducers: {
    addWeatherObj: (state, action) => {
      action.payload.isCel = true;
      state.defData = action.payload;
    },

    removeDefObj: (state) => {
      localStorage.removeItem('latitude');
      localStorage.removeItem('longitude');
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
    },
    chooseLang: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', state.language);
    },
    getLangData: (state, action) => {
      state.language = action.payload;
    },
    changeFalseTemp: (state, action) => {
      let newObj = JSON.parse(JSON.stringify(state.seachedData));
      let newDefObj = JSON.parse(JSON.stringify(state.defData));
      newDefObj = action.payload;
      state.defData = newDefObj;
      newObj = newObj.map((el) => {
        if (el.name === action.payload.name) {
          return action.payload;
        } else {
          return el;
        }
      });
      state.seachedData = newObj;
      localStorage.setItem('cities', JSON.stringify(newObj));
    },
    changeTrueTemp: (state, action) => {
      let newObj = JSON.parse(JSON.stringify(state.seachedData));
      let newDefObj = JSON.parse(JSON.stringify(state.defData));
      newDefObj = action.payload;
      state.defData = newDefObj;
      newObj = newObj.map((el) => {
        if (el.name === action.payload.name) {
          return action.payload;
        } else {
          return el;
        }
      });
      state.seachedData = newObj;
      localStorage.setItem('cities', JSON.stringify(newObj));
    }
  }
});

export const {
  addWeatherObj,
  removeDefObj,
  addSearchcities,
  getLocalData,
  saveIntoStorage,
  removeCities,
  chooseLang,
  getLangData,
  changeFalseTemp,
  changeTrueTemp
} = localSlice.actions;

export default localSlice.reducer;
