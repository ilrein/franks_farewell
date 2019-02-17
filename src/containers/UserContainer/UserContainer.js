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

const UserContainer = ({ user, children }) => {
  const [data] = useState(user);

  const getUser = async () => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${data.attributes.sub}`);
    const json = await result.json();
    console.log(json);
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

export default connect(({ user }) => ({
  user,
}))(UserContainer);
