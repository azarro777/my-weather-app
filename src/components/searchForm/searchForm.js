import React from 'react';
import Script from 'react-load-script';
import { GEO_API_KEY, WEATHER_APP_KEY } from '../../environment/environment';
import { addSearchcities } from '../../localStorage/localSlice';

// const GEO_APIKEY = `${process.env.GEO_APIKEY}`;
const GEO_API =
  'https://maps.googleapis.com/maps/api/js?key=' +
  GEO_API_KEY +
  '&libraries=places,geometry';

class SearchForm extends React.Component {
  handleScriptLoad = () => {
    var options = { types: ['(cities)'] };

    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener(
      'place_changed',
      this.handlePlaceChanged.bind(this)
    );
  };

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    console.log(
      place.name + 'long',
      place.geometry.viewport.Hb.i,
      place.name + 'lat',
      place.geometry.viewport.tc.i
    );
    console.log(place);
    localStorage.setItem(place.name + 'lat', place.geometry.viewport.tc.i);
    localStorage.setItem(place.name + 'long', place.geometry.viewport.Hb.i);
    // if (place && place.formatted_address) this.props.getWeather(place);
    // else this.props.getWeather();
    function searchCity() {
      // `api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.name}&appid=${WEATHER_APP_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          // setData(result);
          // dispatch(addWeatherObj(result));

          console.log(result);
        })
        .catch((err) => console.error(err));
    }
    searchCity();
  }

  sendNewCity = () => {
    console.log('store city');
  };

  render() {
    return (
      <div className='search-form-wrapper'>
        <Script url={GEO_API} onLoad={this.handleScriptLoad} />
        <div className='form-container'>
          <input
            className='search-form__item'
            id='autocomplete'
            placeholder='City name...'
          />
          <button onClick={this.sendNewCity}>add</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;
