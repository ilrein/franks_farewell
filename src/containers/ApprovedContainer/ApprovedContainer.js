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
            Your account is currently awaiting approval.
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
