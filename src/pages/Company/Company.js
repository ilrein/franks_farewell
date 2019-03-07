import React, {
  useState,
} from 'react';
import {
  Form,
  Header,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CompanyContainer from '../../containers/CompanyContainer';
import {
  API_GET_COMPANY,
} from '../../constants';

const Wrapper = styled.div`
  padding: 2rem 4rem;
`;

/**
 * @param { companyId } ObjectId 
 * Uses the User object's companyId
 * to determine whether it should be an 'update' component
 * or a 'create' component
 */
const Company = ({ user }) => {
  const [name, setName] = useState('');
  const [savingCompanyLoading, setSavingCompanyLoading] = useState(false);
  
  const submitCompany = () => {
    setSavingCompanyLoading(true);
  };

  return (
    <CompanyContainer>
      <Wrapper>
        {
          user
          && user.companyId !== null
            ? (
              <Header>
                Update a Company
              </Header>        
            )
            : (
              <Header>
                Create a Company
              </Header>        
            )
        }
        <Form>
          <Form.Input
            label="Name"
            placeholder="Tesla Inc."
            value={name}
            onChange={(event, { value }) => setName(value)}
          />
          <Button
            primary
            loading={savingCompanyLoading}
            onClick={submitCompany}
          >
            Save
          </Button>
        </Form>
      </Wrapper>
    </CompanyContainer>
  );
};

Company.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(Company);
