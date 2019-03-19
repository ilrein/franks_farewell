import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Breadcrumb,
  Header,
  Divider,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

import {
  API_GET_SHIFTS,
  CAPTURE_SHIFTS,
} from '../../constants';
// import fadeIn from '../../anime/fadeIn';
import UserContainer from '../../containers/UserContainer';
import CompanyContainer from '../../containers/CompanyContainer';
import LocationsContainer from '../../containers/LocationsContainer';
import ShiftsContainer from '../../containers/ShiftsContainer';
import SkillsetsContainer from '../../containers/SkillsetsContainer';
import NewShiftModal from './NewShiftModal';
import UpdateShiftModal from './UpdateShiftModal';
import ShiftsTable from '../../components/ShiftsTable';

const Wrapper = styled.div`
  transition: all 0.4s ease-in-out;
  @media (min-width: 767px) {
    padding: 2rem;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled(Header)`
  margin: 0 !important;
`;

const Shifts = ({
  userReducer,
  captureShifts,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const getShifts = async () => {
    const { companyId } = user;
    try {
      const data = await fetch(`${API_GET_SHIFTS}?companyId=${companyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const SHIFTS = await data.json();
      // console.log(shifts);
      captureShifts(SHIFTS);
    } catch (error) {
      //
    }
  };

  const refreshList = () => {
    setOpen(false);
    getShifts();
  };

  return (
    <Wrapper>
      <Breadcrumb style={{ padding: '1rem 0' }}>
        <Link to="/dashboard">
          <Breadcrumb.Section>
            Dashboard
          </Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>
          Shifts
        </Breadcrumb.Section>
      </Breadcrumb>

      <UserContainer>
        <CompanyContainer>
          <LocationsContainer>
            <ShiftsContainer>
              <SkillsetsContainer>
                <Nav>
                  <Heading>
                    Shifts
                  </Heading>

                  <Button
                    color="green"
                    icon="plus"
                    labelPosition="left"
                    content="New Shift"
                    onClick={() => setOpen(true)}
                    disabled={!user.approved}
                  />
                  <NewShiftModal
                    open={open}
                    setOpen={setOpen}
                    onCreateShift={refreshList}
                  />
                  <UpdateShiftModal
                    open={openUpdateModal}
                    setOpen={setOpenUpdateModal}
                    refreshList={refreshList}
                    shiftDoc={currentDoc}
                  />
                </Nav>
                <Divider />
                <ShiftsTable
                  onRowClick={(selectedDoc) => {
                    setOpenUpdateModal(true);
                    setCurrentDoc(selectedDoc);
                  }}
                />
              </SkillsetsContainer>
            </ShiftsContainer>
          </LocationsContainer>
        </CompanyContainer>
      </UserContainer>
    </Wrapper>
  );
};

Shifts.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  captureShifts: PropTypes.func.isRequired,
};

export default connect(
  ({
    shifts,
    userReducer,
  }) => ({
    shifts,
    userReducer,
  }),
  dispatch => ({
    captureShifts: payload => dispatch({
      type: CAPTURE_SHIFTS,
      payload,
    }),
  }),
)(Shifts);
