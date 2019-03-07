import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MonthYearDisplay = styled.div`
  background-color: white;
`;
/**
 * Shows current month
 * has two toggles which change the month
 * and offers a callback on clicked events
 */
const MonthSwapper = () => {
  const [monthYear, setMonthYear] = useState(dayjs().format('MMM YYYY'));

  const subtractMonth = () => {
    const newMonth = dayjs(monthYear).subtract(1, 'month').format('MMM YYYY');
    setMonthYear(newMonth);
  };

  const addMonth = () => {
    const newMonth = dayjs(monthYear).add(1, 'month').format('MMM YYYY');
    setMonthYear(newMonth);
  };

  return (
    <Wrapper>
      <Button
        icon
        onClick={subtractMonth}
      >
        <Icon name="chevron left" />
      </Button>

      <MonthYearDisplay>
        {monthYear}
      </MonthYearDisplay>

      <Button
        icon
        onClick={addMonth}
      >
        <Icon name="chevron right" />
      </Button>
    </Wrapper>
  );
}

export default MonthSwapper;
