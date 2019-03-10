import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line

// Calendar jazz
import Calendar from '../components/Calendar';
import MonthSwapper from '../components/Calendar/MonthSwapper';
import Weekday from '../components/Calendar/Weekday';

// More
import PlacesAutoComplete from '../components/PlacesAutoComplete';
import TimePicker from '../components/TimePicker';

storiesOf('Calendar', module)
  .add('Container', () => (
    <Calendar />
  ));

storiesOf('MonthSwapper', module)
  .add('default', () => (
    <MonthSwapper />
  ));

storiesOf('Weekday', module)
  .add('in current month', () => (
    <Weekday
      day={1}
      isInCurrentMonth
    />
  ))
  .add('not in current month', () => (
    <Weekday
      day={1}
    />
  ));

storiesOf('PlacesAutoComplete', module)
  .add('default', () => (
    <PlacesAutoComplete
      onPlaceSelected={place => action(place)}
    />
  ));

storiesOf('TimePicker', module)
  .add('default', () => (
    <TimePicker
      onChange={time => action(time)}
    />
  ));
