import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Header,
  Segment,
} from 'semantic-ui-react';

import ShiftsContainer from '../../../containers/ShiftsContainer';
import SkillsetsContainer from '../../../containers/SkillsetsContainer';
import SetupSkills from './SetupSkills';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Body = styled.div``;
/**
 * Shows a list of possible positions
 * if the current user has not specified one for themselves yet
 */
const SpecialistView = ({
  userReducer,
  shifts,
  skillsets,
}) => {
  const { user } = userReducer;

  return (
    <ShiftsContainer>
      <SkillsetsContainer>
        <Wrapper>
          {
            user
            && user._id
              ? (
                <>
                  <Header>
                    {user.email}
                  </Header>
                  <Body>
                    {
                      user.skillsets.length === 0
                        ? (
                          <SetupSkills />
                        )
                        : null
                    }
                  </Body>
                </>
              )
              : (
                <Segment
                  loading
                  basic
                  style={{
                    height: '90vh',
                  }}
                />
              )
          }
        </Wrapper>
      </SkillsetsContainer>
    </ShiftsContainer>
  );
};

SpecialistView.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
  skillsets: PropTypes.shape().isRequired,
};

export default connect(({
  userReducer,
  skillsets,
  shifts,
}) => ({
  userReducer,
  skillsets,
  shifts,
}))(SpecialistView);
