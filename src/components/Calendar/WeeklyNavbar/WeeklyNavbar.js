import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const Weekday = styled.div`
  background-color: #EDF0F4;
  text-align: center;
  flex: 1;
  padding: 1rem 0;
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

const WeeklyNavbar = () => (
  <Wrapper>
    {
      weekdays.map(day => (
        <Weekday>
          {day}
        </Weekday>
      ))
    }
  </Wrapper>
);

export default WeeklyNavbar;
