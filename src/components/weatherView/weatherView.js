import classes from './weatherView.module.css';
import { WEATHER_APP_ICON_URL } from '../../environment/environment';

export const WeatherView = ({ view }) => (
  <div className={classes.container}>
    <img
      className={classes.skyImage}
      alt='sky'
      src={`${WEATHER_APP_ICON_URL}${view.weather[0].icon}@2x.png`}
    ></img>
    <p className={classes.sky}>{view.weather[0].main}</p>
  </div>
);
