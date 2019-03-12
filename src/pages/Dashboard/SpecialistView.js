import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Header,
} from 'semantic-ui-react';

import SkillsetsContainer from '../../containers/SkillsetsContainer';

const Wrapper = styled.div`
  padding: 2rem;
`;

/**
 * Shows a list of possible positions
 * if the current user has not specified one for themselves yet
 */
const SpecialistView = ({
  userReducer,
  skillsets,
}) => (
  <SkillsetsContainer>
    <Wrapper>
      <Header>
        {userReducer.user.email}
      </Header>
    </Wrapper>
  </SkillsetsContainer>
);

SpecialistView.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  skillsets: PropTypes.shape().isRequired,
};

export default connect(({
  userReducer,
  skillsets,
}) => ({
  userReducer,
  skillsets,
}))(SpecialistView);
