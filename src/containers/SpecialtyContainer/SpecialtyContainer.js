import React, {
  useState,
} from 'react';
import fetch from 'isomorphic-fetch';

const SpecialtyContainer = ({
  children,
}) => {
  const [speciality] = useState(null);

  return (
    <>
      {children}
    </>
  );
};

export default SpecialtyContainer;
