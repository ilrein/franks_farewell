import React, { useState, useEffect } from 'react';
import {
  Form,
  Header,
  Button,
  Modal,
  // Divider,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';
// import isNil from 'ramda/src/isNil';
// import isEmpty from 'ramda/src/isEmpty';

import fadeIn from '../../anime/fadeIn';
import TimePicker from '../../components/TimePicker';

import {
  API_UPDATE_SHIFT,
  API_DELETE_SHIFT,
} from '../../constants';

const CalendarContainer = styled.div`
  animation: ${fadeIn} 1s ease;
  margin-bottom: 1rem;
`;

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 2,
// });

const UpdateShiftModal = ({
  cognitoUser,
  open,
  setOpen,
  // locations,
  // skillsets,
  shiftDoc,
  refreshList,
}) => {
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  // update states
  const [updating, setUpdating] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState('');

  // Calendar expects a native datetime object
  useEffect(() => {
    if (shiftDoc) {
      console.log(shiftDoc); // eslint-disable-line
      setDate(dayjs(shiftDoc.date).toDate());
      // setStart(shiftDoc)
    }
  }, [shiftDoc]);
  
  // delete states
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);

  // errors
  const [roleIsEmptyError, setRoleIsEmptyError] = useState(false);
  const [startTimeIsEmptyError, setStartTimeEmptyError] = useState(false);
  const [endTimeIsEmptyError, setEndTimeIsEmptyError] = useState(false);

  const updateShift = async () => {
    setUpdating(true);
    try {
      const update = await fetch(API_UPDATE_SHIFT(shiftDoc._id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          job: {
            date,
          },
        }),
      });
      await update.json();
      setUpdating(false);
      refreshList();
      toast.success('Updated shift successfully');
      setOpen(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

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
      refreshList();
      toast.success('Deleted shift');
    } catch (error) {
      console.log(error); // eslint-disable-line
      setDeleting(false);
      setDeleteConfirmIsOpen(false);
    }
  };

  const setTime = (type, time) => {
    const DATE = dayjs().format('YYYY-MM-D');
    const moment = dayjs(`${DATE} ${time}`);
    if (type === 'startTime') {
      setStartTime(moment);

      if (endTime !== null) {
        setDuration(endTime.diff(moment, 'hour'));
      }
    } else if (type === 'endTime') {
      setEndTime(moment);
      setDuration(moment.diff(startTime, 'hour'));
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

                {/* <Form.Input
                  disabled
                  value={shiftDoc.location.name}
                /> */}

                <CalendarContainer>
                  <Calendar
                    onChange={data => setDate(data)}
                    value={date}
                  />
                </CalendarContainer>

                <Form.Group widths="equal">
                  <div className="field required">
                    <label>
                      Start Time
                    </label>
                    <TimePicker
                      onChange={value => setTime('startTime', value)}
                      error={startTimeIsEmptyError}
                    />
                  </div>

                  <div className="field required">
                    <label>
                      End Time
                    </label>
                    <TimePicker
                      onChange={value => setTime('endTime', value)}
                      disabled={startTime === null}
                      error={endTimeIsEmptyError}
                    />
                  </div>

                  <Form.Input
                    label="Duration"
                    disabled
                    value={duration}
                  />
                </Form.Group>

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
                  onClick={updateShift}
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
  // user: PropTypes.shape().isRequired,
  // locations: PropTypes.shape().isRequired,
  // skillsets: PropTypes.shape().isRequired,
  shiftDoc: PropTypes.shape(),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  refreshList: PropTypes.func.isRequired,
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
    // user: userReducer.user,
    shifts,
    locations,
    skillsets,
  }),
)(UpdateShiftModal);
