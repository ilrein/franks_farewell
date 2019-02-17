import React from 'react';
import {
  Header,
  Container,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #eee;
`;

const Dashboard = () => (
  <Wrapper>
    <Container>
      <Header as="h1">
        Dashboard
      </Header>
    </Container>
  </Wrapper>
);

export default Dashboard;
