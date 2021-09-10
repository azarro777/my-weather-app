import classes from './city.module.css';
import moment from 'moment';

export const City = ({ cityData }) => (
  <div className={classes.container}>
    <p className={classes.city}>
      {cityData.name}, {cityData.sys.country}
    </p>
    <p className={classes.date}>
      {moment(new Date(cityData.dt * 1000)).format('ddd, DD MMMM, hh:mm')}
    </p>
  </div>
);
