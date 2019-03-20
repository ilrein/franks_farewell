import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Header,
  Segment,
  Label,
} from 'semantic-ui-react';

import Wrapper from '../../../components/Wrapper';
import SkillsetsContainer from '../../../containers/SkillsetsContainer';
import SetupSkills from './SetupSkills';
import ApplyForShifts from './ApplyForShifts';
/**
 * Shows a list of possible positions
 * if the current user has not specified one for themselves yet
 */
const SpecialistView = ({
  userReducer,
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
                <>
                  {
                    user.skillsets.length === 0
                      ? (
                        <SetupSkills />
                      )
                      : (
                        user.skillsets.map(skill => (
                          <Label
                            key={skill._id}
                            size="huge"
                            color="blue"
                          >
                            {skill.title}
                          </Label>
                        ))
                      )
                  }
                  {
                    user.skillsets.length > 0
                      ? <ApplyForShifts />
                      : null
                  }
                </>
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
};

export default connect(({
  userReducer,
}) => ({
  userReducer,
}))(SpecialistView);
