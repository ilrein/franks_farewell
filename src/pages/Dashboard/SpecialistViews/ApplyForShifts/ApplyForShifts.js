import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShiftsContainer from '../../../../containers/ShiftsContainer';

const Wrapper = styled.div`
  padding: 1rem 0;
`;
/**
 * Check if a user is approved
 * before being able to view shifts
 * @param { approved } Boolean 
 */
const ApplyForShifts = ({
  cognitoUser,
  user,
  shifts,
}) => (
  <ShiftsContainer>
    <Wrapper>
      ApplyForShifts
    </Wrapper>
  </ShiftsContainer>
);

ApplyForShifts.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
};

export default connect(
  ({
    userReducer,
    shifts,
  }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
    shifts,
  }),
)(ApplyForShifts);
