import React, { useState } from 'react';
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

import ShiftsContainer from '../../../../containers/ShiftsContainer';
import ApplyModal from './ApplyModal';

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
  cognitoUser,
  user,
  shifts,
}) => {
  const [open, setOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState({ _id: null });

  const openModal = (doc) => {
    setCurrentDoc(doc);
    setOpen(true);
  };

  return (
    <ShiftsContainer>
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
                    }
                  </Table.Body>
                </Table>
              )
          }
        </Body>
      </Wrapper>
    </ShiftsContainer>
  );
};

ApplyForShifts.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
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
)(ApplyForShifts);
