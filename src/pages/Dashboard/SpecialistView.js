import React from 'react';
import styled from 'styled-components';

import SkillsetsContainer from '../../containers/SkillsetsContainer';

const Wrapper = styled.div`
  padding: 2rem;
`;

const SpecialistView = () => (
  <SkillsetsContainer>
    <Wrapper>
      non admin view
    </Wrapper>
  </SkillsetsContainer>
);

export default SpecialistView;
