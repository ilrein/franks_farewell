import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
// import { action } from '@storybook/addon-actions';

// Calendar jazz
import Calendar from '../components/Calendar';
import MonthSwapper from '../components/Calendar/MonthSwapper';
import WeeklyNavbar from '../components/Calendar/WeeklyNavbar';
import Weekday from '../components/Calendar/Weekday';

storiesOf('Calendar', module)
  .add('Container', () => (
    <Calendar />
  ));

storiesOf('MonthSwapper', module)
  .add('default', () => (
    <MonthSwapper />
  ));

storiesOf('WeeklyNavbar', module)
  .add('default', () => (
    <WeeklyNavbar />
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
