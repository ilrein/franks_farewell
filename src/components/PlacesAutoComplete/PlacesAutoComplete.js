import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import PropTypes from 'prop-types';

const PlacesAutoComplete = ({ onPlaceSelected }) => (
  <div className="ui input fluid">
    <Autocomplete
      onPlaceSelected={place => onPlaceSelected(place)}
      types={['address']}
      componentRestrictions={{ country: 'CA' }}
    />
  </div>
);

PlacesAutoComplete.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
};

export default PlacesAutoComplete;
