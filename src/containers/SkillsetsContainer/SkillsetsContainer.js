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
  API_GET_SKILLSETS,
  CAPTURE_SKILLSETS,
} from '../../constants';

const SkillsetContainer = ({
  children,
  userReducer,
  captureSkills,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for locations
   * @param { companyId } String
   */
  const getSkills = async () => {
    try {
      const data = await fetch(`${API_GET_SKILLSETS}?companyId=${companyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const skills = await data.json();
      captureSkills(skills);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getSkills();
  }, [jwtToken]);

  return (
    <>
      {children}
    </>
  );
};

SkillsetContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureSkills: PropTypes.func.isRequired,
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
  dispatch => ({
    captureSkills: payload => dispatch({
      type: CAPTURE_SKILLSETS,
      payload,
    }),
  }),
)(withRouter(SkillsetContainer));
