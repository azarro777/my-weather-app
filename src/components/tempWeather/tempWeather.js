import classes from './tempWeather.module.css';
import { useDispatch } from 'react-redux';
import { changeFalseTemp, changeTrueTemp } from '../../localStorage/localSlice';

export const TempWeather = ({ tempData }) => {
  const dispatch = useDispatch();
  console.log('tempData', tempData);

  const changeCel = (tempData) => {
    let newObj = JSON.parse(JSON.stringify(tempData));
    newObj.isCel = true;
    console.log('temp changed', newObj);
    dispatch(changeTrueTemp(newObj));
  };

  const changeFah = (tempData) => {
    let newObj = JSON.parse(JSON.stringify(tempData));
    newObj.isCel = false;
    console.log('temp changed', newObj);
    dispatch(changeFalseTemp(newObj));
  };

  const converter = (tempData) => {
    if (tempData.isCel) {
      return Math.round(tempData.main.temp);
    } else {
      const fah = 1.8 * tempData.main.temp + 32;
      return Math.round(fah);
    }
  };

  const converterFeel = (tempData) => {
    if (tempData.isCel) {
      return Math.round(tempData.main.feels_like);
    } else {
      const fah = 1.8 * tempData.main.feels_like + 32;
      return Math.round(fah);
    }
  };

  console.log('converter', converter(tempData));

  return (
    <div className={classes.container}>
      <div className={classes.temp}>
        {tempData.main.temp > 0
          ? '+' + converter(tempData)
          : '-' + converter(tempData)}
        <p
          className={classes.celcius}
          onClick={() => changeCel(tempData)}
          style={{ color: tempData.isCel ? '#000000' : '#8D8D8D' }}
        >
          &#8451;{' '}
        </p>
        <p className={classes.sign}></p>
        <p
          className={classes.fah}
          onClick={() => {
            changeFah(tempData);
          }}
          style={{ color: tempData.isCel ? '#8D8D8D' : '#000000' }}
        >
          &#8457;
        </p>
      </div>
      <p className={classes.feel}>
        Feels like:
        {tempData.main.feels_like > 0
          ? '+' + converterFeel(tempData)
          : '-' + converterFeel(tempData)}
        <span> {tempData.isCel ? '\u2103' : '\u2109'}</span>
      </p>
    </div>
  );
};
