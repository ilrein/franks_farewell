import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  return (
    <Wrapper>
      <CompanyContainer>
        locations
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
