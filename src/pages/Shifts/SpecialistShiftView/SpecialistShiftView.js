import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Table,
  Label,
  Pagination,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';

import {
  CAPTURE_SHIFTS,
} from '../../../constants';
import getShiftsBySpecialistId from '../../../utils/requests/shifts/getShiftsBySpecialist';
import Wrapper from '../../../components/Wrapper';
import labelColor from '../../../utils/labelColor';

const Pages = styled(Pagination)`
  float: right;
`;

const SpecialistShiftView = ({
  user,
  cognitoUser,
  captureShifts,
  shifts,
}) => {
  const [pulledJobs, setPulledJobs] = useState(false);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const getUserShifts = async (token, specialistId) => {
    const list = await getShiftsBySpecialistId(token, specialistId);
    captureShifts(list);
  };

  const onPageChange = page => getUserShifts(jwtToken, user._id, page);

  useEffect(() => {
    if (user._id) {
      getUserShifts(jwtToken, user._id);
      setPulledJobs(true);
    }
  }, [pulledJobs]);

  return (
    <Wrapper>
      <Header>
        Your shifts
      </Header>

      <>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Status
              </Table.HeaderCell>
              <Table.HeaderCell>
                Location
              </Table.HeaderCell>
              <Table.HeaderCell>
                Address
              </Table.HeaderCell>
              <Table.HeaderCell>
                Role
              </Table.HeaderCell>
              <Table.HeaderCell>
                Start
              </Table.HeaderCell>
              <Table.HeaderCell>
                End
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        
          <Table.Body>
            {
              shifts.docs.map(doc => (
                <Table.Row
                  key={doc._id}
                >
                  <Table.Cell>
                    <Label color={labelColor[doc.status]}>
                      {doc.status}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>
                    {doc.location.name}
                  </Table.Cell>
                  <Table.Cell>
                    {doc.location.address}
                  </Table.Cell>
                  <Table.Cell>
                    <Label>
                      {doc.skillset.title}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>
                    {dayjs(doc.startTime).format('ddd. MMM. D/YY @ h:mm A')}
                  </Table.Cell>
                  <Table.Cell>
                    {dayjs(doc.endTime).format('ddd. MMM. D/YY @ h:mm A')}
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
          {
            shifts.totalPages
              ? (
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="7">
                      <Pages
                        defaultActivePage={1}
                        totalPages={shifts.totalPages}
                        onPageChange={(event, { activePage }) => onPageChange(activePage)}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              )
              : null
          }
        </Table>
      </>
    </Wrapper>
  );
};

SpecialistShiftView.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  captureShifts: PropTypes.func.isRequired,
};

export default connect(
  ({ userReducer, shifts }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
    shifts,
  }),
  dispatch => ({
    captureShifts: payload => dispatch({
      type: CAPTURE_SHIFTS,
      payload,
    }),
  }),
)(SpecialistShiftView);
