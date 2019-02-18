import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */

const UserContainer = ({ userReducer, children }) => {
  const [data] = useState(userReducer.cognitoUser);

  const getUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/users/${data.attributes.sub}`);
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

export default connect(({
  userReducer,
}) => ({
  userReducer,
}))(UserContainer);
