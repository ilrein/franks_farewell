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
import LocationsContainer from '../../containers/LocationsContainer';
import ShiftsContainer from '../../containers/ShiftsContainer';
import SkillsetsContainer from '../../containers/SkillsetsContainer';
import NewShiftModal from './NewShiftModal';
import UpdateShiftModal from './UpdateShiftModal';

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

  const onCreateShift = () => {
    setOpen(false);
    getShifts();
  };

  return (
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
              />
              <NewShiftModal
                open={open}
                setOpen={setOpen}
                onCreateShift={onCreateShift}
              />
              <UpdateShiftModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                onCreateShift={onCreateShift}
                onDeleteShift={onCreateShift}
                shiftDoc={currentDoc}
              />
            </Nav>
            <Divider />
            <div>
              {
                shifts.docs.length > 0
                  ? (
                    shifts.docs.map(doc => (
                      <LinkSegment
                        key={doc._id}
                        onClick={() => {
                          setOpenUpdate(true);
                          setCurrentDoc(doc);
                        }}
                      >
                        <Label>
                          Created:
                          &nbsp;
                          {dayjs(doc.createdOn).format('MMM. ddd YYYY @ h:mm A')}
                        </Label>
                        <Label
                          color="yellow"
                        >
                          {doc.status}
                        </Label>
                        &nbsp;
                        <Label>
                          On:
                          &nbsp;
                          {
                            dayjs(doc.date).format('MMM. ddd D YYYY')
                          }
                        </Label>
                        &nbsp;
                        {
                          dayjs(doc.startTime).format('h:mm A')
                        }
                        &nbsp;
                        -
                        &nbsp;
                        {
                          dayjs(doc.endTime).format('h:mm A')
                        }
                      </LinkSegment>
                    ))
                  )
                  : <div>No shifts found.</div>
              }
            </div>
          </Wrapper>
        </SkillsetsContainer>
      </ShiftsContainer>
    </LocationsContainer>
  );
}

Shifts.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
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
