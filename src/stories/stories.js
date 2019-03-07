import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

// Calendar jazz
import Calendar from '../components/Calendar';
import MonthSwapper from '../components/Calendar/MonthSwapper';;

storiesOf('Calendar', module)
  .add('Container', () => (
    <Calendar />
  ));

storiesOf('MonthSwapper', module)
  .add('default', () => (
    <MonthSwapper />
  ));
