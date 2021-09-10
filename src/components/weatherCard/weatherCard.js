import React from 'react';
import classes from './weatherCard.module.css';
import { WeatherView } from '../weatherView/weatherView';
import { DiagramView } from '../diagramView/diagramView';
import { City } from '../city/city';
import { TempWeather } from '../tempWeather/tempWeather';
import { WhpView } from '../whpView/whpView';

export const WeatherCard = ({ data }) => (
  <div className={classes.card}>
    <div className={classes.header}>
      <City cityData={data} />
      <WeatherView view={data} />
    </div>

    <DiagramView />
    <div className={classes.tempContainer}>
      <TempWeather tempData={data} />
      <WhpView whpData={data} />
    </div>
  </div>
);
