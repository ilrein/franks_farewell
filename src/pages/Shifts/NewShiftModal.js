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

import fadeIn from '../../anime/fadeIn';
import TimePicker from '../../components/TimePicker';

const CalendarContainer = styled.div`
  animation: ${fadeIn} 1s ease;
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const NewShiftModal = ({
  user,
  cognitoUser,
  open,
  setOpen,
  onCreateShift,
  locations,
  skillsets,
}) => {
  const { companyId } = user;
  const [saving, setSaving] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState('');

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

  const submit = () => {

  };

  const setTimeAndCalculateDuration = (type, time) => {
    const DATE = dayjs().format('YYYY-MM-D');
    if (type === 'startTime') {
      const moment = dayjs(`${DATE} ${time}`);
      setStartTime(moment);
      if (endTime !== null) {
        setDuration(moment.diff(endTime, 'hour'));
      }
    } else if (type === 'endTime') {
      const moment = dayjs(`${DATE} ${time}`);
      setEndTime(moment);
      setDuration(moment.diff(startTime, 'hour'));
    }
  };

  return (
    <Modal
      // open={open}
      open
    >
      <Modal.Content>
        <Form>
          <Header>
            New Shift
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
                    onChange={(event, { value }) => setLocationId(value)}
                  />


                  <div className="field">
                    <label>
                      Date
                    </label>

                    <CalendarContainer>
                      <Calendar
                        onChange={data => setDate(data)}
                        value={new Date()}
                      />
                    </CalendarContainer>
                  </div>

                  <Form.Group widths="equal">
                    <div className="field required">
                      <label>
                        Start Time
                      </label>
                      <TimePicker
                        onChange={value => setTimeAndCalculateDuration('startTime', value)}
                      />
                    </div>

                    <div className="field required">
                      <label>
                        End Time
                      </label>
                      <TimePicker
                        onChange={value => setTimeAndCalculateDuration('endTime', value)}
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

NewShiftModal.propTypes = {
  cognitoUser: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
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
)(NewShiftModal);
