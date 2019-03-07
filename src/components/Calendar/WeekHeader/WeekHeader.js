import React from 'react';
import styled from 'styled-components';

const Weekday = styled.div`
  background-color: #EDF0F4;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const WeekHeader = ({ day }) => (
  <Weekday>
    {day}
  </Weekday>
);

export default WeekHeader;
