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

import fadeIn from '../../anime/fadeIn';

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
  const [startTime, setStartTime] = useState('9:00');
  const [endTime, setEndTime] = useState('17:00');

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
                        onChange={data => console.log(data)}
                        value={new Date()}
                      />
                    </CalendarContainer>
                  </div>

                  <div className="field">
                    <label>
                      Start Time
                    </label>
                    {/* <TimePicker
                      onChange={setStartTime}
                      value={startTime}
                      disableClock
                    /> */}
                  </div>

                  <div className="field">
                    <label>
                      End Time
                    </label>
                    {/* <TimePicker
                      onChange={setEndTime}
                      value={endTime}
                      disableClock
                    /> */}
                  </div>
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
