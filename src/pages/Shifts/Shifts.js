import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Divider,
  Button,
  Segment,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import dayjs from 'dayjs';

import {
  API_GET_SHIFTS,
  CAPTURE_SHIFTS,
} from '../../constants';
import fadeIn from '../../anime/fadeIn';
import UserContainer from '../../containers/UserContainer';
import CompanyContainer from '../../containers/CompanyContainer';
import LocationsContainer from '../../containers/LocationsContainer';
import ShiftsContainer from '../../containers/ShiftsContainer';
import SkillsetsContainer from '../../containers/SkillsetsContainer';
import NewShiftModal from './NewShiftModal';
import UpdateShiftModal from './UpdateShiftModal';
import ShiftsTable from '../../components/ShiftsTable';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinkSegment = styled(Segment)`
  animation: ${fadeIn} 1s ease;
  &:hover {
    cursor: pointer;
    background-color: aliceblue !important;
  }
`;

const Shifts = ({
  userReducer,
  shifts,
  captureShifts,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
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
    <UserContainer>
      <CompanyContainer>
        <LocationsContainer>
          <ShiftsContainer>
            <SkillsetsContainer>
              <Wrapper>
                <Nav>
                  <Header>
                    Shifts
                  </Header>

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
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    refreshList={refreshList}
                    shiftDoc={currentDoc}
                  />
                </Nav>
                <Divider />
                <ShiftsTable />
              </Wrapper>
            </SkillsetsContainer>
          </ShiftsContainer>
        </LocationsContainer>
      </CompanyContainer>
    </UserContainer>
  );
};

Shifts.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
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
