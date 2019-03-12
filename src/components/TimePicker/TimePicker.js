import React from 'react';
import {
  Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { arrayOfHours } from './utils';

const TimePicker = ({
  placeholder,
  onChange,
  ...restProps
}) => {
  const format = args => args.map((arg, index) => ({
    key: index,
    text: arg,
    value: arg,
  }));

  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      selection
      options={format(arrayOfHours())}
      onChange={(event, { value }) => onChange(value)}
      {...restProps}
    />
  );
};

TimePicker.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  placeholder: 'Select',
};

export default TimePicker;
