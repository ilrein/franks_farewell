import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';

import {
  API_GET_COMPANY,
  CAPTURE_COMPANY,
} from '../../constants';

const CompanyContainer = ({
  children,
  userReducer,
  captureCompany,
}) => {
  const { user, cognitoUser } = userReducer;
  const [companyId] = useState(user.companyId);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for company
   * @param { sub } String
   */
  const getCompany = async () => {
    if (!isNil(companyId)) {
      try {
        const get = await fetch(API_GET_COMPANY(companyId), {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureCompany(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  useEffect(() => {
    getCompany();
  }, [companyId]);

  return (
    <>
      {children}
    </>
  );
};

CompanyContainer.propTypes = {
  children: PropTypes.shape().isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureCompany: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureCompany: payload => dispatch({
    type: CAPTURE_COMPANY,
    payload,
  }),
});

export default connect(
  ({ userReducer }) => ({ userReducer }),
  mapDispatchToProps,
)(CompanyContainer);
