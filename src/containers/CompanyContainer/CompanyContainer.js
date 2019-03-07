import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CompanyContainer = ({
  children,
  user,
}) => {
  const [company] = useState(user.company);

  return (
    <>
      {children}
    </>
  );
};

CompanyContainer.propTypes = {
  children: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(CompanyContainer);
