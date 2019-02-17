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
  const [data, setData] = useState(user);

  const getUser = async () => {
    const result = await fetch(`${process.env.API_URL}/api/${data.attributes.sub}`);
    const json = await result.json();
    console.log(json);
  }

  useEffect(() => {
    console.log(process.env);
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
