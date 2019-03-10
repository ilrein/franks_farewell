import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import {
  withRouter,
} from 'react-router-dom';

import {
  API_GET_SHIFTS,
  CAPTURE_SHIFTS,
} from '../../constants';

const ShiftsContainer = ({
  children,
  userReducer,
  captureShifts,
}) => {
  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for locations
   * @param { companyId } String
   */
  const getShifts = async () => {
    const { companyId } = user;
    try {
      const data = await fetch(`${API_GET_SHIFTS}?companyId=${companyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const shifts = await data.json();
      // console.log(shifts);
      captureShifts(shifts);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getShifts();
  }, [jwtToken]);

  return (
    <>
      {children}
    </>
  );
};

ShiftsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureShifts: PropTypes.func.isRequired,
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
  dispatch => ({
    captureShifts: payload => dispatch({
      type: CAPTURE_SHIFTS,
      payload,
    }),
  }),
)(withRouter(ShiftsContainer));
