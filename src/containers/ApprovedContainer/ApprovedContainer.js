import React from 'react';
import PropTypes from 'prop-types';
import {
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const ApprovedContainer = ({
  user,
  children,
}) => (
  <>
    {
      !user.approved
        ? (
          <Message info>
            Thanks for updating your qualifications. Your account
            will be approved shortly and you can begin to book work.
          </Message>
        )
        : children
    }
  </>
);

ApprovedContainer.propTypes = {
  user: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
  }),
)(ApprovedContainer);
