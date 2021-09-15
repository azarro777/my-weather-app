import classes from './whpView.module.css';

export const WhpView = ({ whpData }) => {
  return (
    <div className={classes.container}>
      <p className={classes.wind}>
        Wind: <span>{whpData.wind.speed} m/s</span>
      </p>
      <p className={classes.humidity}>
        Humidity: <span>{whpData.main.humidity}%</span>
      </p>
      <p className={classes.pressure}>
        Pressure: <span>{whpData.main.pressure}Pa</span>
      </p>
    </div>
  );
};
