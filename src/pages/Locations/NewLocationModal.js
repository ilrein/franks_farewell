/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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

import PlacesAutoComplete from '../../components/PlacesAutoComplete';
import {
  API_CREATE_LOCATION,
} from '../../constants';

const NewLocationModal = ({
  user,
  cognitoUser,
  open,
  setOpen,
  onCreateLocation,
}) => {
  const [address, setAddress] = useState(null);
  const [name, setName] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const { companyId } = user;

  const submit = async () => {
    setSavingLocation(true);
    try {
      const post = await fetch(API_CREATE_LOCATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          location: {
            companyId,
            name,
            address: address.formatted_address,
          },
        }),
      });

      await post.json();
      setSavingLocation(false);
      toast.success(`Created ${name}`);
      onCreateLocation();
      setOpen(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <Modal
      open={open}
    >
      <Modal.Content>
        <Form
          onKeyPress={(event) => {
            if (event.which === 13) {
              event.preventDefault();
            }
          }}
        >
          <Header>
            New Location
          </Header>
          <Form.Input
            label="Name"
            value={name}
            onChange={(event, { value }) => setName(value)}
            required
            placeholder="Enter a name"
          />
          <div className="ui field required">
            <label>
              Address
            </label>
            <PlacesAutoComplete
              onPlaceSelected={place => setAddress(place)}
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            loading={savingLocation}
          >
            Close
          </Button>

          <Button
            type="submit"
            primary
            onClick={submit}
            loading={savingLocation}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

NewLocationModal.propTypes = {
  cognitoUser: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onCreateLocation: PropTypes.func.isRequired,
};

export default connect(
  ({ userReducer }) => ({
    cognitoUser: userReducer.cognitoUser,
    user: userReducer.user,
  }),
)(NewLocationModal);
