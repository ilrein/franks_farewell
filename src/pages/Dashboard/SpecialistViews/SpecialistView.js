import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Header,
  Segment,
  Label,
} from 'semantic-ui-react';

import SkillsetsContainer from '../../../containers/SkillsetsContainer';
import SetupSkills from './SetupSkills';
import ApplyForShifts from './ApplyForShifts';

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
  // skillsets,
}) => {
  const { user } = userReducer;

  return (
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
                      : (
                        user.skillsets.map(skill => (
                          <>
                            <Label
                              key={skill._id}
                              size="massive"
                              color="blue"
                            >
                              {skill.title}
                            </Label>
                          </>
                        ))
                      )
                  }
                  {
                    user.skillsets.length > 0
                      ? <ApplyForShifts />
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
  );
};

SpecialistView.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  // shifts: PropTypes.shape().isRequired,
  // skillsets: PropTypes.shape().isRequired,
};

export default connect(({
  userReducer,
  // skillsets,
  // shifts,
}) => ({
  userReducer,
  // skillsets,
  // shifts,
}))(SpecialistView);
