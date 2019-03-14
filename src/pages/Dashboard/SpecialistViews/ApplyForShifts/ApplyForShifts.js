import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Divider,
  Header,
  Message,
  Table,
} from 'semantic-ui-react';

import ShiftsContainer from '../../../../containers/ShiftsContainer';

const Wrapper = styled.div`
  padding: 1rem 0;
`;

const Body = styled.div``;
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
  console.log(shifts);

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
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        One
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        One
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        One
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
  
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        One
                      </Table.Cell>
                      <Table.Cell>
                        One
                      </Table.Cell>
                      <Table.Cell>
                        One
                      </Table.Cell>
                    </Table.Row>
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
