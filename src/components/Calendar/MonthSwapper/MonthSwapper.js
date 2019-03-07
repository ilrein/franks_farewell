import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const MonthYearDisplay = styled.div`
  background-color: white;
`;
/**
 * Shows current month
 * has two toggles which change the month
 * and offers a callback on clicked events
 * @param { onChange } function
 */
const MonthSwapper = ({ onChange }) => {
  const [monthYear, setMonthYear] = useState(dayjs().format('MMM YYYY'));

  const subtractMonth = () => {
    const newMonth = dayjs(monthYear).subtract(1, 'month').format('MMM YYYY');
    setMonthYear(newMonth);
    onChange(newMonth);
  };

  const addMonth = () => {
    const newMonth = dayjs(monthYear).add(1, 'month').format('MMM YYYY');
    setMonthYear(newMonth);
    onChange(newMonth);
  };

  return (
    <Wrapper>
      <Button
        icon
        onClick={subtractMonth}
        basic
      >
        <Icon name="chevron left" />
      </Button>

      <MonthYearDisplay>
        {monthYear}
      </MonthYearDisplay>

      <Button
        icon
        onClick={addMonth}
        basic
      >
        <Icon name="chevron right" />
      </Button>
    </Wrapper>
  );
};

MonthSwapper.propTypes = {
  onChange: PropTypes.func,
};

MonthSwapper.defaultProps = {
  onChange: () => {},
};

export default MonthSwapper;
