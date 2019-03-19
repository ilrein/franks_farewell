import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Message,
  Table,
  Label,
  Pagination,
} from 'semantic-ui-react';
import dayjs from 'dayjs';

import ShiftsContainer from '../../containers/ShiftsContainer';
import ApprovedContainer from '../../containers/ApprovedContainer';
import labelColor from '../../utils/labelColor';

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

const Pages = styled(Pagination)`
  float: right;
`;
/**
 * Check if a user is approved
 * before being able to view shifts
 * @param { approved } Boolean 
 */
const ShiftsTable = ({
  user,
  shifts,
  onRowClick,
  onPageChange,
}) => (
  <ApprovedContainer>
    <ShiftsContainer>
      <Wrapper>
        <Body>
          {
            !user.approved
              ? (
                <Message info>
                  Thanks for updating your information. Your account
                  will be approved shortly and you can begin to book work.
                </Message>
              )
              : (
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
                        <ClickableRow
                          key={doc._id}
                          onClick={() => onRowClick(doc)}
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
                        </ClickableRow>
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
              )
          }
        </Body>
      </Wrapper>
    </ShiftsContainer>
  </ApprovedContainer>
);

ShiftsTable.propTypes = {
  user: PropTypes.shape().isRequired,
  shifts: PropTypes.shape().isRequired,
  onRowClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
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
)(ShiftsTable);
