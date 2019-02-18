import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import { CAPTURE_USER } from '../../constants';
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
  const [data] = useState(userReducer.cognitoUser);

  const getUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${data.attributes.sub}`);
    const user = await res.json();
    captureUser(user);
  }

  useEffect(() => {
    getUser();
  }, [data]);

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
