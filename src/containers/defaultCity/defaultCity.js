import React, { useEffect } from 'react';
import {
  WEATHER_APP_URL,
  WEATHER_APP_KEY
} from '../../environment/environment';
import { WeatherCard } from '../../components/weatherCard/weatherCard';
import SearchForm from '../../components/searchForm/searchForm';
import { useSelector, useDispatch } from 'react-redux';
import { addWeatherObj, removeDefObj } from '../../localStorage/localSlice';

export const DefaultCity = () => {
  const defObj = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const latLS = localStorage.getItem('latitude');
  const longLS = localStorage.getItem('longitude');

  console.log('default object', defObj.defData);

  const removeDefaultCard = () => {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    dispatch(removeDefObj());
  };

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
      });

      await fetch(
        `${WEATHER_APP_URL}/weather/?lat=${latLS}&lon=${longLS}&units=metric&APPID=${WEATHER_APP_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          // setData(result);
          dispatch(addWeatherObj(result));

          console.log(result);
        });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <SearchForm getWeather={defObj.defData} />
      {typeof defObj.defData.main !== 'undefined' ? (
        <WeatherCard data={defObj.defData} remove={removeDefaultCard} />
      ) : (
        <h1>Sorry, can't render your location weather</h1>
      )}
    </div>
  );
};
