import React from 'react';
import {
  Header,
  Container,
  Card,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: #eee;
  margin-top: 1rem;
`;

const CoolCard = styled(Card)`
  transition: all 0.25s ease !important;
  &:hover {
    background-color: aliceblue !important;
  }
`;

const Dashboard = () => (
  <Wrapper>
    <Container>
      <Header as="h1">
        Dashboard
      </Header>
      <div>
        <Link to="/company">
          <CoolCard
            header="Company"
            description="Configure company settings"
          />
        </Link>
      </div>
    </Container>
  </Wrapper>
);

export default Dashboard;
