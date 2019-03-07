import React, { useState } from 'react';
import { connect } from 'react-redux';
import isNil from 'ramda/src/isNil';
import PropTypes from 'prop-types';
import {
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Locations = ({ user }) => {
  const [companyId] = useState(user.companyId);

  return (
    <Wrapper>
      {
        isNil(companyId)
          ? (
            <div>
              <Message>
                <p>
                  Must create a company before configuring locations.
                </p>
                <Link to="/company">
                  Create a company now.
                </Link>
              </Message>
            </div>
          )
          : (
            <div>
              Locations
            </div>
          )
      }
    </Wrapper>
  );
};

Locations.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(Locations);
