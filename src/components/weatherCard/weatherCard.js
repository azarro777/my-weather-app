import React from 'react';
import classes from './weatherCard.module.css';
import { WeatherView } from '../weatherView/weatherView';
import { DiagramView } from '../diagramView/diagramView';
import { City } from '../city/city';
import { TempWeather } from '../../containers/tempWeather/tempWeather';
import { WhpView } from '../whpView/whpView';

export const WeatherCard = ({ data, remove }) => (
  <div className={classes.card}>
    <div className={classes.header}>
      <City cityData={data} />
      <div className={classes.header_right_block}>
        <WeatherView view={data} />
        <button className={classes.remove_card} onClick={() => remove()}>
          x
        </button>
      </div>
    </div>

    <DiagramView tempData={data} />
    <div className={classes.tempContainer}>
      <TempWeather tempData={data} />
      <WhpView whpData={data} />
    </div>
  </div>
);
