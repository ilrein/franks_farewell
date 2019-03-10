import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Divider,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShiftsContainer from '../../containers/ShiftsContainer';
import NewShiftModal from './NewShiftModal';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Shifts = ({
  userReducer,
  shifts,
}) => {
  const [open, setOpen] = useState(false);
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const onCreateShift = () => {

  };

  return (
    <ShiftsContainer>
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
        </Nav>
        <Divider />
        {
          shifts.docs.length > 0
            ? (
              shifts.map(shift => (
                <div>{shift._id}</div>
              ))
            )
            : <div>No shifts found.</div>
        }
      </Wrapper>
    </ShiftsContainer>
  );
}

Shifts.propTypes = {
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
)(Shifts);
