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
import buildQueryString from 'build-query-string';
import isNil from 'ramda/src/isNil';
import isEmpty from 'ramda/src/isEmpty';

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
    const {
      companyId,
      skillsets,
    } = user;

    /**
     * https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object/38483660
     */
    let queryString;
    if (skillsets.length > 0) {
      queryString = buildQueryString({
        ...(!isNil(companyId) && { companyId }),
        ...(!isEmpty(skillsets[0].title) && { skillset: skillsets[0].title }),
      });
    } else {
      queryString = buildQueryString({
        ...(!isNil(companyId) && { companyId }),
      });
    }

    console.log('string', queryString);
    
    const URL = `${API_GET_SHIFTS}?${queryString}`;

    try {
      const data = await fetch(URL, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const shifts = await data.json();
      captureShifts(shifts);
    } catch (error) {
      console.log(error); // eslint-disable-line
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
