import React, { useEffect } from 'react';
import classes from './defaultCity.module.css';
import { WeatherCard } from '../../components/weatherCard/weatherCard';
import { SearchForm } from '../../components/searchForm/searchForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWeatherObj,
  removeDefObj,
  removeCities
} from '../../localStorage/localSlice';
import {
  WEATHER_APP_URL,
  WEATHER_APP_KEY
} from '../../environment/environment';

export const DefaultCity = () => {
  const cities = useSelector((state) => state.local);
  const defObj = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const latLS = localStorage.getItem('latitude');
  const longLS = localStorage.getItem('longitude');

  console.log('default object', defObj);
  console.log(cities.seachedData);

  const removeDefaultCard = () => {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    dispatch(removeDefObj());
  };

  // const removeSearchedCard = (c) => {
  //   dispatch(removeCities(c.name));
  // };

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
    <div className={classes.container}>
      <SearchForm getWeather={defObj.defData} />
      <div className={classes.card_container}>
        {typeof defObj.defData.main !== 'undefined' ? (
          <WeatherCard data={defObj.defData} remove={removeDefaultCard} />
        ) : null}
        {cities.seachedData.length !== 0
          ? cities.seachedData.map((el, index) => {
              console.log('el', el.name);
              return (
                <WeatherCard
                  key={index}
                  data={el}
                  remove={() => dispatch(removeCities(el.name))}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};
