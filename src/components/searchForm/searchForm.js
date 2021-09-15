import React, { useEffect } from 'react';
import classes from './searchForm.module.css';
import Script from 'react-load-script';
import { WEATHER_APP_KEY, GEO_API } from '../../environment/environment';
import {
  addSearchcities,
  getLocalData,
  saveIntoStorage,
  getLangData
} from '../../localStorage/localSlice';
import { useSelector, useDispatch } from 'react-redux';

export const SearchForm = () => {
  const cities = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.local.language);

  let langJson = localStorage.getItem('language');
  if (lang !== langJson) {
    dispatch(getLangData(langJson));
  }
  console.log('lang', lang);

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
      document.getElementById('buttonId').onclick = function () {
        var place = autocomplete.getPlace();
        handlePlaceChanged(place);
        document.getElementById('autocomplete').value = '';
      };
    });
  };

  async function searchCity(place) {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${place.name}&appid=${WEATHER_APP_KEY}&lang=${lang}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        const cel = { isCel: true };
        const newRes = { ...cel, ...result };
        dispatch(addSearchcities(newRes));
        dispatch(saveIntoStorage());
        console.log('newRes', newRes);
      })
      .catch((err) => console.error(err));
  }

  const handlePlaceChanged = (place) => {
    console.log(place);
    searchCity(place);
  };

  console.log('cities', cities.seachedData);

  return (
    <div className={classes.search_form_wrapper}>
      <Script url={GEO_API} onLoad={handleScriptLoad} />
      <div className='form-container'>
        <input
          className={classes.search_form__item}
          id='autocomplete'
          placeholder='City name...'
        />
        <button className={classes.search_form__button} id='buttonId'>
          Add
        </button>
      </div>
    </div>
  );
};
