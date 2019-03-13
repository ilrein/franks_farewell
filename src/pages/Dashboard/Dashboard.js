import React from 'react';
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

import SpecialistView from './SpecialistViews/SpecialistView';
import CompanyContainer from '../../containers/CompanyContainer';
import LocationsContainer from '../../containers/LocationsContainer';
import ShiftsContainer from '../../containers/ShiftsContainer';

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

const Dashboard = ({
  userReducer,
  company,
  locations,
  shifts,
}) => {
  // const [companyId] = useState(company._id);
  const { name } = company;
  const { user } = userReducer;

  return (
    user
    && user.type === 'admin'
      ? (
        <CompanyContainer>
          <LocationsContainer>
            <ShiftsContainer>
              <Wrapper>
                <Container>
                  <Header as="h1">
                    Dashboard
                  </Header>
                  <Grid
                    columns={3}
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
                              {
                                locations.totalDocs === 0
                                  ? <>0 Locations</>
                                  : null
                              }
                              {
                                locations.totalDocs === 1
                                  ? <>1 Location</>
                                  : null
                              }
                              {
                                locations.totalDocs > 1
                                  ? (
                                    <>
                                      {locations.totalDocs}
                                      &nbsp;
                                      Locations
                                    </>
                                  )
                                  : null
                              }
                            </Card.Content>
                          </CoolCard>
                        </Link>
                      </Grid.Column>

                      <Grid.Column>
                        <Link to="shifts">
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
                              {
                                shifts.totalDocs === 0
                                  ? <>0 Shifts</>
                                  : null
                              }
                              {
                                shifts.totalDocs === 1
                                  ? <>1 Shift</>
                                  : null
                              }
                              {
                                shifts.totalDocs > 1
                                  ? (
                                    <>
                                      {shifts.totalDocs}
                                      &nbsp;
                                      Shifts
                                    </>
                                  )
                                  : null
                              }
                            </Card.Content>
                          </CoolCard>
                        </Link>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Wrapper>
            </ShiftsContainer>
          </LocationsContainer>
        </CompanyContainer>
      )
      : <SpecialistView />
  );
};

Dashboard.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
  locations: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
};

export default connect(
  ({
    userReducer,
    company,
    locations,
    shifts,
  }) => ({
    userReducer,
    company,
    locations,
    shifts,
  }),
)(Dashboard);
