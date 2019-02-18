import React from 'react';
import {
  Header,
  Container,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #eee;
  margin-top: 1rem;
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
