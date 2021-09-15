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
      state.defData = action.payload;
    },

    removeDefObj: (state) => {
      state.defData = [];
    },
    addSearchcities: (state, action) => {
      state.seachedData.push(action.payload);
      // state.seachedData.push(...{ isCel: true });
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
      // localStorage.getItem('language');
      state.language = action.payload;
    },
    changeFalseTemp: (state, action) => {
      let newObj = JSON.parse(JSON.stringify(state.seachedData));
      newObj = newObj.map((el) => {
        if (el.name === action.payload.name) {
          return action.payload;
        } else {
          return el;
        }
      });
      state.seachedData = newObj;
      localStorage.setItem('cities', JSON.stringify(newObj));
      console.log('state', newObj);
    },
    changeTrueTemp: (state, action) => {
      let newObj = JSON.parse(JSON.stringify(state.seachedData));
      newObj = newObj.map((el) => {
        if (el.name === action.payload.name) {
          return action.payload;
        } else {
          return el;
        }
      });
      state.seachedData = newObj;
      localStorage.setItem('cities', JSON.stringify(newObj));
      console.log('state', newObj);
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
