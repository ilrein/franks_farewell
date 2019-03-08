/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import {
  Form,
  Header,
  Button,
} from 'semantic-ui-react';
import PlacesAutoComplete from '../../components/PlacesAutoComplete';

const NewLocationModal = () => {
  const [address, setAddress] = useState(null);
  const [name, setName] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);

  return (
    <Form>
      <Header>
        Locations
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
      >
        Submit
      </Button>
    </Form>
  );
};

export default NewLocationModal;
