import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import getShiftsBySpecialistId from '../../../utils/requests/shifts/getShiftsBySpecialist';
import Wrapper from '../../../components/Wrapper';

const SpecialistShiftView = ({
  user,
  cognitoUser,
}) => {
  const [pulledJobs, setPulledJobs] = useState(false);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const getUserShifts = async (token, specialistId) => {
    const list = await getShiftsBySpecialistId(token, specialistId);
    console.log(list);
  };

  useEffect(() => {
    getUserShifts(jwtToken, user._id);
    setPulledJobs(true);
  }, [pulledJobs]);

  return (
    <Wrapper>
      SpecialistShiftView
    </Wrapper>
  );
};

export default connect(
  ({ userReducer }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
  }),
)(SpecialistShiftView);
