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
  API_GET_LOCATIONS,
  CAPTURE_LOCATIONS,
} from '../../constants';

const LocationsContainer = ({
  children,
  userReducer,
  captureLocations,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for locations
   * @param { companyId } String
   */
  const getLocations = async () => {
    try {
      const data = await fetch(`${API_GET_LOCATIONS}?companyId=${companyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const locations = await data.json();
      captureLocations(locations);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getLocations();
  }, [jwtToken]);

  return (
    <>
      {children}
    </>
  );
};

LocationsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureLocations: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureLocations: payload => dispatch({
    type: CAPTURE_LOCATIONS,
    payload,
  }),
});

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  mapDispatchToProps,
)(withRouter(LocationsContainer));
