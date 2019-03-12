import React, { useState } from 'react';
import {
  Form,
  Header,
  Button,
  Modal,
  Divider,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import styled from 'styled-components';
// import dayjs from 'dayjs';
// import isNil from 'ramda/src/isNil';
// import isEmpty from 'ramda/src/isEmpty';

import fadeIn from '../../anime/fadeIn';
// import TimePicker from '../../components/TimePicker';

import {
  API_DELETE_SHIFT,
} from '../../constants';

const CalendarContainer = styled.div`
  animation: ${fadeIn} 1s ease;
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const UpdateShiftModal = ({
  user,
  cognitoUser,
  open,
  setOpen,
  // locations,
  // skillsets,
  shiftDoc,
  onDeleteShift,
}) => {
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  
  // delete states
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);

  // update states
  const [updating, setUpdating] = useState(false);

  const deleteShift = async () => {
    setDeleting(true);
    try {
      const remove = await fetch(API_DELETE_SHIFT(shiftDoc._id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });
  
      await remove.json();
      setDeleting(false);
      setDeleteConfirmIsOpen(false);
      setOpen(false);
      onDeleteShift();
      toast.success('Deleted shift');
    } catch (error) {
      console.log(error); // eslint-disable-line
      setDeleting(false);
      setDeleteConfirmIsOpen(false);
    }
  };

  return (
    <Modal
      open={open}
    >
      {
        shiftDoc
          ? (
            <Modal.Content>
              <Form>
                <Header>
                  Update Shift
                </Header>
                <Form.Input
                  disabled
                  value={shiftDoc.location.name}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                  loading={updating}
                >
                  Close
                </Button>

                <Button
                  type="submit"
                  primary
                  // onClick={submit}
                  loading={updating}
                >
                  Submit
                </Button>

                <Button
                  color="red"
                  onClick={() => setDeleteConfirmIsOpen(true)}
                  loading={deleting}
                >
                  Delete
                </Button>

                <Modal
                  open={deleteConfirmIsOpen}
                >
                  <Modal.Content>
                    <Header>
                      Are you sure you want to delete this shift?
                    </Header>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      loading={deleting}
                      onClick={() => setDeleteConfirmIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      loading={deleting}
                      onClick={deleteShift}
                      primary
                    >
                      Confirm
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Form>
            </Modal.Content>
          )
          : null
      }
    </Modal>
  );
};

UpdateShiftModal.propTypes = {
  cognitoUser: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  // locations: PropTypes.shape().isRequired,
  // skillsets: PropTypes.shape().isRequired,
  shiftDoc: PropTypes.shape(),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onDeleteShift: PropTypes.func.isRequired,
};

UpdateShiftModal.defaultProps = {
  shiftDoc: {},
};

export default connect(
  ({
    userReducer,
    shifts,
    locations,
    skillsets,
  }) => ({
    cognitoUser: userReducer.cognitoUser,
    user: userReducer.user,
    shifts,
    locations,
    skillsets,
  }),
)(UpdateShiftModal);
