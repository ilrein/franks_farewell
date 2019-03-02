import React, { useState } from 'react';
import { connect } from 'react-redux';

const CompanyContainer = ({
  children,
  user,
}) => {
  const [company] = useState(user.company);

  return (
    <>
      {children}
    </>
  )
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(CompanyContainer);
