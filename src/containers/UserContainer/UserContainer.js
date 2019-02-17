import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */

const UserContainer = () => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    // const result = await fetch('')
  });

  return (
    <>
      UserContainer
    </>
  );
}

export default UserContainer;
