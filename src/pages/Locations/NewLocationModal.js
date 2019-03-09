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

import PlacesAutoComplete from '../../components/PlacesAutoComplete';
import {
  API_CREATE_LOCATION,
  CREATE_LOCATION,
} from '../../constants';

const NewLocationModal = ({
  cognitoUser,
  trigger,
}) => {
  const [address, setAddress] = useState(null);
  const [name, setName] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const submit = async () => {
    const post = await fetch(API_CREATE_LOCATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': jwtToken,
      },
      body: {

      }
    });

    const location = await post.json();
    console.log(location);
  };

  return (
    <Modal
      trigger={trigger}
    >
      <Modal.Content>
        <Form>
          <Header>
            New Location
          </Header>
          <Form.Input
            label="Name"
            value={name}
            onChange={(event, { value }) => setName(value)}
            required
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
  trigger: PropTypes.node.isRequired,
};

export default connect(
  ({ userReducer }) => ({ cognitoUser: userReducer.cognitoUser }),
  dispatch => ({
    captureCompany: payload => dispatch({
      type: CREATE_LOCATION,
      payload,
    }),
  }),
)(NewLocationModal);
