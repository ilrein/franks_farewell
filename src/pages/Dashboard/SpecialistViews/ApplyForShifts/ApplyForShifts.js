import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Divider,
  Header,
  Message,
  Table,
  Label,
} from 'semantic-ui-react';
import dayjs from 'dayjs';
import fetch from 'isomorphic-fetch';

import ApplyModal from './ApplyModal';
import {
  API_GET_SHIFTS,
  CAPTURE_SHIFTS,
} from '../../../../constants';

const Wrapper = styled.div`
  padding: 1rem 0;
`;

const Body = styled.div``;

const ClickableRow = styled(Table.Row)`
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: #eee;
  }
`;
/**
 * Check if a user is approved
 * before being able to view shifts
 * @param { approved } Boolean 
 */
const ApplyForShifts = ({
  user,
  cognitoUser,
  shifts,
  captureShifts,
}) => {
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  const [refreshToken] = useState(cognitoUser.signInUserSession.refreshToken.token);
  const [fetchedShifts, setSetchedShifts] = useState(false);

  const [page] = useState(1);

  const getShifts = async () => {
    try {
      const get = await fetch(`${API_GET_SHIFTS}?page=${page}&skillset=${user.skillsets[0].title}&status=PENDING`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
          'refresh-token': refreshToken,
        },
      });
      const list = await get.json();
      setSetchedShifts(true);
      captureShifts(list);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };
  
  useEffect(() => {
    getShifts();
  }, [fetchedShifts]);

  const [open, setOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState({ _id: null });

  const openModal = (doc) => {
    setCurrentDoc(doc);
    setOpen(true);
  };

  return (
    <Wrapper>
      <Header>
        Shift Feed
      </Header>
      <Divider />
      <Body>
        {
          !user.approved
            ? (
              <Message info>
                Thanks for updating your qualifications. Your account
                will be approved shortly and you can begin to book work.
              </Message>
            )
            : (
              <Table>
                {
                  currentDoc._id !== null
                    ? (
                      <ApplyModal
                        open={open}
                        handleClose={() => setOpen(false)}
                        doc={currentDoc}
                        onSuccess={() => getShifts()}
                      />
                    )
                    : null
                }
                <Table.Header>
                  <Table.Row>
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
                    !fetchedShifts
                      ? null
                      : (
                        shifts.docs.map(doc => (
                          <ClickableRow
                            key={doc._id}
                            onClick={() => openModal(doc)}
                          >
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
                          </ClickableRow>
                        ))
                      )
                  }
                </Table.Body>
              </Table>
            )
        }
      </Body>
    </Wrapper>
  );
};

ApplyForShifts.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
  captureShifts: PropTypes.func.isRequired,
};

export default connect(
  ({
    userReducer,
    shifts,
  }) => ({
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
)(ApplyForShifts);
