import React from 'react';
import styled from 'styled-components';
import {
  Header,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShiftsContainer from '../../containers/ShiftsContainer';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Shifts = ({ shifts }) => (
  <ShiftsContainer>
    <Wrapper>
      <Header>
        Shifts
      </Header>
      <Divider />
      {
        shifts.docs.length > 0
          ? (
            shifts.map(shift => (
              <div>{shift._id}</div>
            ))
          )
          : <div>No shifts found.</div>
      }
    </Wrapper>
  </ShiftsContainer>
);

Shifts.propTypes = {
  shifts: PropTypes.shape().isRequired,
};

export default connect(
  ({ shifts }) => ({ shifts }),
)(Shifts);
