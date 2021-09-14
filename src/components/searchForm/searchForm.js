import React from 'react';
import classes from './searchForm.module.css';
import Script from 'react-load-script';
import { WEATHER_APP_KEY, GEO_API } from '../../environment/environment';
import {
  addSearchcities,
  getLocalData,
  saveIntoStorage
} from '../../localStorage/localSlice';
import { useSelector, useDispatch } from 'react-redux';

export const SearchForm = () => {
  const cities = useSelector((state) => state.local);
  const dispatch = useDispatch();
  let citiesJson = localStorage.getItem('cities');
  if (cities.seachedData.length === 0) {
    console.log(citiesJson === null);
    if (citiesJson === null) {
      citiesJson = '';
    } else {
      dispatch(getLocalData(JSON.parse(citiesJson)));
    }
  }

  const handleScriptLoad = () => {
    var options = { types: ['(cities)'] };

    // Initialize Google Autocomplete
    /*global google*/
    var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );
    // Fire Event when a suggested name is selected
    // autocomplete.addListener('place_changed', handlePlaceChanged(autocomplete));
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      handlePlaceChanged(place);
    });
  };

  const handlePlaceChanged = (place) => {
    console.log(place);

    function searchCity() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.name}&appid=${WEATHER_APP_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          dispatch(addSearchcities(result));
          console.log(result);
        })
        .catch((err) => console.error(err));
    }
    searchCity();
  };

  console.log('cities', cities.seachedData);

  return (
    <div className={classes.search_form_wrapper}>
      <Script url={GEO_API} onLoad={handleScriptLoad} />
      <div className='form-container'>
        <input
          lang='en'
          className={classes.search_form__item}
          id='autocomplete'
          placeholder='City name...'
        />
        <button
          className={classes.search_form__button}
          onClick={() => dispatch(saveIntoStorage())}
        >
          Add
        </button>
      </div>
    </div>
  );
};
