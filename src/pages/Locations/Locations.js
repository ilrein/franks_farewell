import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Header,
  Button,
  Divider,
} from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

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
  user,
  locations,
}) => {
  const [companyId] = useState(user.companyId); // eslint-disable-line

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
              trigger={(
                <Button
                  color="green"
                  icon="plus"
                  labelPosition="left"
                  content="New Location"
                />
              )}
            />
          </Nav>
          <Divider />
          {
            locations.length > 0
              ? (
                <div>locations</div>
              )
              : <div>no locations found</div>
          }
        </LocationsContainer>
      </CompanyContainer>
    </Wrapper>
  );
};

Locations.propTypes = {
  user: PropTypes.shape().isRequired,
  // cognitoUser: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
};

export default connect(
  ({
    userReducer,
    locations,
  }) => ({
    user: userReducer.user,
    locations,
  }),
)(Locations);
