import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Header,
  Button,
  Divider,
  Card,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
// import { Link } from 'react-router-dom';

import {
  API_GET_LOCATIONS,
  CAPTURE_LOCATIONS,
} from '../../constants';
import CompanyContainer from '../../containers/CompanyContainer';
import LocationsContainer from '../../containers/LocationsContainer';
import NewLocationModal from './NewLocationModal';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
/**
 * Use companyId to pull a
 * list of locations
 * @param { companyId } ObjectId
 */
const Locations = ({
  userReducer,
  locations,
  captureLocations,
}) => {
  const [open, setOpen] = useState(false);

  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const onCreateLocation = async () => {
    try {
      const data = await fetch(`${API_GET_LOCATIONS}?companyId=${companyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const LOCATIONS = await data.json();
      captureLocations(LOCATIONS);
    } catch (error) {
      //
    }
  };

  return (
    <Wrapper>
      <CompanyContainer>
        <LocationsContainer>
          <Nav>
            <Header
              style={{ margin: 0 }}
            >
              Locations
            </Header>
            <NewLocationModal
              open={open}
              setOpen={setOpen}
              onCreateLocation={onCreateLocation}
            />
            <Button
              color="green"
              icon="plus"
              labelPosition="left"
              content="New Location"
              onClick={() => setOpen(true)}
            />
          </Nav>
          <Divider />
          {
            locations.docs.length > 0
              ? (
                locations.docs.map(doc => (
                  <div
                    key={doc._id}
                  >
                    <Card
                      header={doc.name}
                      description={doc.address}
                    />
                  </div>
                ))
              )
              : <div>No locations found. Create one now.</div>
          }
        </LocationsContainer>
      </CompanyContainer>
    </Wrapper>
  );
};

Locations.propTypes = {
  locations: PropTypes.shape().isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureLocations: PropTypes.func.isRequired,
};

export default connect(
  ({
    locations,
    userReducer,
  }) => ({
    locations,
    userReducer,
  }),
  dispatch => ({
    captureLocations: payload => dispatch({
      type: CAPTURE_LOCATIONS,
      payload,
    }),
  }),
)(Locations);
