import React, { useState, useEffect } from 'react';
import {
  Form,
  Header,
  Button,
  Modal,
  Message,
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
// import find from 'ramda/src/find';
// import propEq from 'ramda/src/propEq';

import fadeIn from '../../anime/fadeIn';
import TimePicker from '../../components/TimePicker';
import currencyFormatter from '../../utils/currencyFormatter';

import {
  API_UPDATE_SHIFT,
  API_DELETE_SHIFT,
} from '../../constants';

const ModalWrapper = styled(Modal)`
  animation: ${fadeIn} 1s ease;
`;

const CalendarContainer = styled.div`
  animation: ${fadeIn} 1s ease;
  margin-bottom: 1rem;
`;

const UpdateShiftModal = ({
  cognitoUser,
  open,
  setOpen,
  // locations,
  skillsets,
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
      // console.log(shiftDoc); // eslint-disable-line
      setDate(dayjs(shiftDoc.date).toDate());
      setStartTime(dayjs(shiftDoc.startTime).format('h:mm A'));
      setEndTime(dayjs(shiftDoc.endTime).format('h:mm A'));
    }
  }, [shiftDoc]);
  
  // delete states
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);

  // errors
  // const [roleIsEmptyError, setRoleIsEmptyError] = useState(false);
  // const [startTimeIsEmptyError, setStartTimeEmptyError] = useState(false);
  // const [endTimeIsEmptyError, setEndTimeIsEmptyError] = useState(false);

  const updateShift = async () => {
    const DATE = dayjs(date).format('YYYY-MM-D');
    const start = dayjs(`${DATE} ${startTime}`).toDate();
    const end = dayjs(`${DATE} ${endTime}`).toDate();
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
            startTime: start,
            endTime: end,
            duration,
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

  /**
   * Update duration whenever startTime or endTime changes
   */
  useEffect(() => {
    const DATE = dayjs(date).format('YYYY-MM-D');
    const start = dayjs(`${DATE} ${startTime}`);
    const end = dayjs(`${DATE} ${endTime}`);

    setDuration(end.diff(start, 'hour'));
  }, [startTime, endTime]);

  const formatSkillsets = docs => docs.map(doc => ({
    key: doc._id,
    value: doc._id,
    text: `${doc.title} - ${currencyFormatter.format(doc.payrate)}`,
  }));

  return (
    <ModalWrapper
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
                {
                  shiftDoc.status !== 'PENDING'
                    ? (
                      <>
                        <Message>
                          Only shifts that are&nbsp;
                          <b>pending</b>
                          &nbsp;may be modified
                        </Message>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                          }}
                          loading={updating}
                        >
                          Close
                        </Button>
                      </>
                    )
                    : (
                      <>
                        <Form.Input
                          disabled
                          value={shiftDoc.location.name}
                        />

                        <Form.Dropdown
                          label="Role/Position"
                          required
                          placeholder="Select role"
                          fluid
                          search
                          selection
                          options={formatSkillsets(skillsets.docs)}
                          disabled
                          value={shiftDoc.skillset._id}
                        />

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
                              onChange={value => setStartTime(value)}
                              value={startTime}
                            />
                          </div>

                          <div className="field required">
                            <label>
                              End Time
                            </label>
                            <TimePicker
                              onChange={value => setEndTime(value)}
                              disabled={startTime === null}
                              value={endTime}
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
                              color="red"
                            >
                              Confirm
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </>
                    )
                }
              </Form>
            </Modal.Content>
          )
          : null
      }
    </ModalWrapper>
  );
};

UpdateShiftModal.propTypes = {
  cognitoUser: PropTypes.shape().isRequired,
  skillsets: PropTypes.shape().isRequired,
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
