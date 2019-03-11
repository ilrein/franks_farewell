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
import dayjs from 'dayjs';
import isNil from 'ramda/src/isNil';
import isEmpty from 'ramda/src/isEmpty';

import fadeIn from '../../anime/fadeIn';
import TimePicker from '../../components/TimePicker';

import {
  API_CREATE_SHIFT,
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
  onCreateShift,
  locations,
  skillsets,
  shiftDoc,
}) => {
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  console.log(shiftDoc); // eslint-disable-line

  // function states
  const [saving, setSaving] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [role, setRole] = useState(null);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState('');

  // errors
  const [roleIsEmptyError, setRoleIsEmptyError] = useState(false);
  const [startTimeIsEmptyError, setStartTimeEmptyError] = useState(false);
  const [endTimeIsEmptyError, setEndTimeIsEmptyError] = useState(false);

  // for semantic dropdown
  const formatSemanticOptions = docs => docs.map(doc => ({
    key: doc._id,
    value: doc._id,
    text: doc.name,
  }));

  const formatSkillsets = docs => docs.map(doc => ({
    key: doc._id,
    value: doc._id,
    text: `${doc.title} - ${formatter.format(doc.payrate)}`,
  }));

  const submit = async () => {
    if (isNil(role)) {
      setRoleIsEmptyError(true);
      return;
    }
    setRoleIsEmptyError(false);

    if (isNil(startTime)) {
      setStartTimeEmptyError(true);
      return;
    }
    setStartTimeEmptyError(false);

    if (isNil(endTime)) {
      setEndTimeIsEmptyError(true);
      return;
    }
    setEndTimeIsEmptyError(false);

    setSaving(true);
    try {
      const POST = await fetch(API_CREATE_SHIFT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          job: {
            companyId,
            locationId,
            date,
            startTime,
            endTime,
            skillset: role,
          },
        }),
      });

      const result = await POST.json();
      if (result.errors) {
        toast.error(result.message);
        setSaving(false);
        return;
      }
      toast.success(`Created shift on: ${date} for ${duration} hours`);
      onCreateShift();
      setSaving(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
      setSaving(false);
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
      <Modal.Content>
        <Form>
          <Header>
            Update Shift
          </Header>
          <Form.Dropdown
            label="Location"
            required
            placeholder="Select location"
            fluid
            search
            selection
            options={formatSemanticOptions(locations.docs)}
            onChange={(event, { value }) => setLocationId(value)}
          />

          {
            locationId
              && skillsets.totalDocs > 0
              ? (
                <>
                  <Form.Dropdown
                    label="Role/Position"
                    required
                    placeholder="Select role"
                    fluid
                    search
                    selection
                    options={formatSkillsets(skillsets.docs)}
                    onChange={(event, { value }) => setRole(value)}
                    error={roleIsEmptyError}
                  />


                  <div className="field">
                    <label>
                      Date
                    </label>

                    <CalendarContainer>
                      <Calendar
                        onChange={data => setDate(data)}
                        value={date}
                      />
                    </CalendarContainer>
                  </div>

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
                  <Divider />
                </>
              )
              : null
          }

          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            loading={saving}
          >
            Close
          </Button>

          <Button
            type="submit"
            primary
            onClick={submit}
            loading={saving}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

UpdateShiftModal.propTypes = {
  cognitoUser: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
  skillsets: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onCreateShift: PropTypes.func.isRequired,
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
