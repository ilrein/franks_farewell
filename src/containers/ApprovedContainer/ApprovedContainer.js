import React from 'react';
import PropTypes from 'prop-types';
import {
  Message,
} from 'semantic-ui-react';

const ApprovedContainer = ({
  user,
  children,
}) => {
  return (
    <>
      {
        !user.approved
          ? (
            <Message info>
              Thanks for updating your qualifications. Your account
              will be approved shortly and you can begin to book work.
            </Message>
          )
          : { children }
      }
    </>
  );
}

ApprovedContainer.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
};

export default connect(
  ({
    userReducer,
    shifts,
  }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
    shifts,
  }),
)(ApprovedContainer);
