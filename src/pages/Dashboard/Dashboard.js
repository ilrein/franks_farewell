import React, { useState } from 'react';
import {
  Header,
  Container,
  Card,
  Icon,
  Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background-color: #eee;
  margin-top: 1rem;
`;

const CoolCard = styled(Card)`
  margin: 0.5rem !important;
  transition: all 0.25s ease !important;
  &:hover {
    background-color: aliceblue !important;
  }
`;

const Dashboard = ({ company }) => {
  // const [companyId] = useState(company._id);
  const [name] = useState(company.name || '');

  return (
    <Wrapper>
      <Container>
        <Header as="h1">
          Dashboard
        </Header>
        <Grid
          columns={4}
          stackable
        >
          <Grid.Row>
            <Grid.Column>
              <Link to="/company">
                <CoolCard
                  header="Company"
                  description={name ? `Update ${name}` : 'Configure company settings'}
                />
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Link to="/locations">
                <CoolCard>
                  <Card.Content>
                    <Card.Header>
                      Locations
                    </Card.Header>
                    <Card.Description>
                      Manage locations
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="building" />
                    0 locations
                  </Card.Content>
                </CoolCard>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <CoolCard>
                <Card.Content>
                  <Card.Header>
                    Shifts
                  </Card.Header>
                  <Card.Description>
                    Manage shifts
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="calendar" />
                  0 shifts
                </Card.Content>
              </CoolCard>
            </Grid.Column>

            <Grid.Column>
              <CoolCard>
                <Card.Content>
                  <Card.Header>
                    Staff
                  </Card.Header>
                  <Card.Description>
                    Manage staff
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="user" />
                  0 users
                </Card.Content>
              </CoolCard>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Wrapper>
  );
};

Dashboard.propTypes = {
  company: PropTypes.shape().isRequired,
};

export default connect(
  ({ company }) => ({ company }),
)(Dashboard);
