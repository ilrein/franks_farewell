import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 12rem;
  height: 12rem;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row-reverse;
`;

const Day = styled.div`
  color: ${props => props.isInCurrentMonth ? '#D3D3D3' : '#365E86'};
`;

const Weekday = ({
  isInCurrentMonth,
  day,
}) => (
  <Wrapper>
    <Day isInCurrentMonth={isInCurrentMonth}>
      {day}
    </Day>
  </Wrapper>
);

export default Weekday;
