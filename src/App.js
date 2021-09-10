import './App.css';
import React, { useEffect, useState } from 'react';
import { WEATHER_APP_URL, WEATHER_APP_KEY } from './environment/environment';
import { WeatherCard } from './components/weatherCard/weatherCard';
import SearchForm from './components/searchForm/searchForm';

function App() {
  // const [latitude, setLatitude] = useState([]);
  // const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  // localStorage.setItem('latitude', latitude);
  // localStorage.setItem('longitude', long);
  const latLS = localStorage.getItem('latitude');
  const longLS = localStorage.getItem('longitude');

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        // setLatitude(position.coords.latitude);
        // setLong(position.coords.longitude);
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
      });

      await fetch(
        `${WEATHER_APP_URL}/weather/?lat=${latLS}&lon=${longLS}&units=metric&APPID=${WEATHER_APP_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
      console.log('api key', WEATHER_APP_KEY);
      // console.log('Latitude is:', latitude);
      // console.log('Longitude is:', long);
      console.log('localStorage', latLS, longLS);
    };
    getData();
  }, [latLS, longLS]);

  return (
    <div className='App'>
      <SearchForm getWeather={data} />
      {typeof data.main !== 'undefined' ? (
        <WeatherCard data={data} />
      ) : (
        <h1>Sorry, can't render your location weather</h1>
      )}
    </div>
  );
}

export default App;
