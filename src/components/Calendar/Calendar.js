import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  Grid,
} from 'semantic-ui-react';

import MonthSwapper from './MonthSwapper';
import WeekHeader from './WeekHeader';
import Weekday from './Weekday';

const CalendarGrid = styled(Grid)`
  margin: 0 !important;
`;

const HeaderCol = styled(Grid.Column)`
  padding: 0 !important;
`;

const weekdays = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

const Calendar = () => {
  const daysInMonth = () => dayjs().daysInMonth();

  return (
    <>
      <MonthSwapper />
      <CalendarGrid
        columns={7}
        stackable
      >
        <Grid.Row>
          {weekdays.map(value => (
            <HeaderCol>
              <WeekHeader day={value} />
            </HeaderCol>
          ))}
        </Grid.Row>
      </CalendarGrid> 
      <CalendarGrid
        columns={7}
        stackable
      > 
        {
          Array(daysInMonth()).fill().map((index, value) => (
            <Weekday day={value} />
          ))
        }
      </CalendarGrid>
    </>
  );
};

export default Calendar;
