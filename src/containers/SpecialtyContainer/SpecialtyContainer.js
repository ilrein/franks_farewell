import React, {
  useState,
} from 'react';

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
