import React, { useState } from 'react';
import {
  Form,
  Header,
  Button,
  Modal,
  Dropdown,
  Divider,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const NewShiftModal = ({
  user,
  cognitoUser,
  open,
  setOpen,
  onCreateShift,
  locations,
}) => {
  const { companyId } = user;
  const [saving, setSaving] = useState(false);
  const [locationId, setLocationId] = useState(null);

  const formatSemanticOptions = docs => docs.map(doc => ({
    key: doc._id,
    value: doc._id,
    text: doc.name,
  }));

  const submit = () => {

  };

  return (
    <Modal
      open={open}
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
              ? (
                <>
                  <Form.Input
                    label="Role/Position"
                    placeholder="test"
                  />
                </>
              )
              : null
          }

          <Divider />

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
  }) => ({
    cognitoUser: userReducer.cognitoUser,
    user: userReducer.user,
    shifts,
    locations,
  }),
)(NewShiftModal);
