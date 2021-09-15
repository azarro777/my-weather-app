import classes from './languageSelector.module.css';
import { useDispatch } from 'react-redux';
import { chooseLang } from '../../localStorage/localSlice';

export const LanguageSelector = ({ name, value, handleChange }) => {
  const dispatch = useDispatch();

  handleChange = (event) => {
    dispatch(chooseLang(event.target.value));
  };
  return (
    <div>
      <select
        name={name}
        className={classes.select_input}
        value={value}
        onChange={handleChange}
      >
        <option value='en'>En</option>
        <option value='ru'>Ru</option>
        <option value='ua'>Ua</option>
      </select>
    </div>
  );
};
