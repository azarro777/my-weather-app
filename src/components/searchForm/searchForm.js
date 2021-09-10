import React from 'react';
// import { Input } from 'semantic-ui-react';
import Script from 'react-load-script';
import { GEO_API_KEY } from '../../environment/environment';

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

  handlePlaceChanged(obj) {
    const place = this.autocomplete.getPlace();
    if (place && place.formatted_address) this.props.getWeather(place);
    else this.props.getWeather();
  }

  render() {
    return (
      <div className='search-form-wrapper'>
        <Script url={GEO_API} onLoad={this.handleScriptLoad} />
        <div className='form-container'>
          <input className='search-form__item' id='autocomplete' />
          <button>add</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;
