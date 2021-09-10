import classes from './tempWeather.module.css';

export const TempWeather = ({ tempData }) => (
  <div className={classes.container}>
    <p className={classes.temp}>
      {tempData.main.temp > 0
        ? '+' + Math.round(tempData.main.temp)
        : '-' + Math.round(tempData.main.temp)}
      <span>&#8451;</span>
    </p>
    <p className={classes.feel}>
      Feels like:
      {tempData.main.feels_like > 0
        ? '+' + Math.round(tempData.main.feels_like)
        : '-' + Math.round(tempData.main.feels_like)}
      <span>&#8451;</span>
    </p>
  </div>
);
