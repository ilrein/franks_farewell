import React, { useState } from 'react';
import {
  Form,
  Header,
  Button,
  Modal,
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
}) => {
  const [saving, setSaving] = useState('');
  const { companyId } = user;

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
          <Form.Input
            label="Name"
            // value={name}
            // onChange={(event, { value }) => setName(value)}
            required
            placeholder="Enter a name"
          />
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
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onCreateShift: PropTypes.func.isRequired,
};

export default connect(
  ({ userReducer, shifts }) => ({
    cognitoUser: userReducer.cognitoUser,
    user: userReducer.user,
    shifts,
  }),
)(NewShiftModal);
