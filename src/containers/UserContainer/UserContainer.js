import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import {
  API_GET_USER,
  API_CREATE_USER,
  CAPTURE_USER,
} from '../../constants';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */
const UserContainer = ({
  userReducer,
  captureUser,
  children,
}) => {
  const [cognitoUser] = useState(userReducer.cognitoUser);
  /**
   * @function {}
   * looks for a user object on /api/users/
   * creates one if not found
   * looks for initial value of custom:type in CognitoUser
   */
  const getUser = async () => {
    try {
      const res = await fetch(API_GET_USER(cognitoUser.attributes.sub), {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
        }
      });
      const user = await res.json();
      /**
       * Create a user obj is not found
       */
      if (user === null) {
        const { attributes } = cognitoUser;

        try {
          const CREATE_USER = await fetch(API_CREATE_USER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
            },
            body: JSON.stringify({
              user: {
                sub: attributes.sub,
                type: attributes['custom:type'],
                email: attributes.email,
              }
            })
          });

          const newUser = await CREATE_USER.json();
          captureUser(newUser);
        } catch (error) {
          console.log(error);
        }
      } else {
        captureUser(user);
      }
      captureUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [cognitoUser]);

  return (
    <>
      {children}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  captureUser: payload => dispatch({
    type: CAPTURE_USER,
    payload,
  })
});

export default connect(({ userReducer }) => ({
  userReducer,
}), mapDispatchToProps)(UserContainer);
