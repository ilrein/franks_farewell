import React from 'react';
import styled from 'styled-components';
import {
  Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import ShiftsContainer from '../../containers/ShiftsContainer';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Shifts = () => (
  <ShiftsContainer>
    <Wrapper>
      <Header>
        Shifts
      </Header>
    </Wrapper>
  </ShiftsContainer>
);

export default connect(
  ({ shifts }) => ({ shifts }),
)(Shifts);
