import React, { useState } from 'react';
import {
  Button,
  Header,
  Modal,
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  API_UPDATE_SHIFT,
} from '../../../../constants';

const CommitText = styled.div`
  padding: 1rem 0;
`;

const ApplyModal = ({
  open,
  handleClose,
  doc,
  user,
  cognitoUser,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const submit = async () => {
    setSubmitting(true);

    const updatedDoc = JSON.stringify({
      job: {
        ...doc,
        specialist: {
          _id: user._id,
        },
        status: 'ACCEPTED',
      },
    });

    try {
      const update = await fetch(`${API_UPDATE_SHIFT(doc._id)}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: updatedDoc,
      });

      await update.json();
      setSubmitting(false);
      handleClose();
      toast.success('Successfully accepted shift');
    } catch (error) {
      console.log(error); // eslint-disable-line
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
    >
      <Modal.Content>
        <Modal.Description>
          <Header>
            Apply for Job
          </Header>
          <div>
            <Label>
              {doc.location.name}
            </Label>
            <Label>
              {doc.location.address}
            </Label>
            <CommitText>
              Commit to working on&nbsp;
              <Label color="yellow">
                {dayjs(doc.startTime).format('dddd, MMMM D/YY @ h:mm A')}
              </Label>
              <br />
              Until:&nbsp;
              <Label color="orange">
                {dayjs(doc.endTime).format('dddd, MMMM D/YY @ h:mm A')}
              </Label>
              <br />
              Duration (hours):&nbsp;
              <Label color="olive">
                {doc.duration}
              </Label>
            </CommitText>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={handleClose}
          loading={submitting}
        >
          Close
        </Button>
        <Button
          primary
          onClick={submit}
          loading={submitting}
        >
          Apply
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ApplyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  doc: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
  }),
)(ApplyModal);
