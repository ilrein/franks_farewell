import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  Header,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

import CompanyContainer from '../../containers/CompanyContainer';

const Wrapper = styled.div`
  padding: 2rem;
`;
/**
 * Use companyId to pull a
 * list of locations
 * @param { companyId } ObjectId
 */
const Locations = ({ user }) => {
  const [companyId] = useState(user.companyId);

  const [name, setName] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);

  return (
    <Wrapper>
      <CompanyContainer>
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

          <Button
            type="submit"
            primary
          >
            Submit
          </Button>
        </Form>
      </CompanyContainer>
    </Wrapper>
  );
};

Locations.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(Locations);
