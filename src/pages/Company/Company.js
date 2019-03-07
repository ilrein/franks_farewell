import React, {
  useState,
} from 'react';
import {
  Form,
  Header,
  Button,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
  API_CREATE_COMPANY,
  API_UPDATE_COMPANY,
  CAPTURE_COMPANY,
  API_UPDATE_USER,
  CAPTURE_USER,
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
const Company = ({
  userReducer,
  company,
  captureCompany,
  captureUser,
}) => {
  const { user, cognitoUser } = userReducer;
  const [ownerSub] = useState(user.sub);
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const [name, setName] = useState(company.name);
  const [savingCompanyLoading, setSavingCompanyLoading] = useState(false);
  const [companySubmissionError, setCompanySubmissionError] = useState(null);

  const updateUserWithCompanyId = async (companyId) => {
    try {
      const updateUser = await fetch(API_UPDATE_USER(ownerSub), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          user: {
            companyId,
          },
        }),
      });
      /**
       * MongoDB returns the object BEFORE
       * the updated result, so we can't rely on the 
       * literal response to directly save into Redux
       * we will update the object manually for our UI
       */
      const result = await updateUser.json();
      const MODDED_USER = {
        ...result,
        companyId,
      };
      captureUser(MODDED_USER);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };
  
  const submitCompany = async () => {
    setSavingCompanyLoading(true);
    /**
     * first and foremost,
     * we must create a company
     * then we must add the id
     * to the user object as well
     */
    try {
      const createCompany = await fetch(API_CREATE_COMPANY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          company: {
            ownerSub,
            name,
          },
        }),
      });

      const result = await createCompany.json();
      captureCompany(result);
      /**
       * lets update the user with the companyId now
       */
      updateUserWithCompanyId(result._id);
      setSavingCompanyLoading(false);
      toast.success(`Saved ${result.name}`);
    } catch (error) {
      setCompanySubmissionError(error);
      setSavingCompanyLoading(false);
    }
  };

  const updateCompany = async () => {
    setSavingCompanyLoading(true);

    try {
      const update = await fetch(API_UPDATE_COMPANY(user.companyId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          company: {
            name,
          },
        }),
      });

      const result = await update.json();
      /**
       * MongoDB updated objects return
       * the object before its update,
       * manually configure the redux state :)
       */
      const MODDED_COMPANY = {
        ...result,
        name,
      };
      captureCompany(MODDED_COMPANY);
      setSavingCompanyLoading(false);
      toast.success(`Updated ${MODDED_COMPANY.name}`);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <>
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
        {
          companySubmissionError
            ? (
              <Message error>
                {companySubmissionError}
              </Message>
            )
            : null
        }
        <Form>
          <Form.Input
            label="Name"
            placeholder="Tesla Inc."
            value={name}
            onChange={(event, { value }) => setName(value)}
          />

          {
            user
              && user.companyId
              ? (
                <Button
                  primary
                  loading={savingCompanyLoading}
                  onClick={updateCompany}
                >
                  Update
                </Button>
              )
              : (
                <Button
                  primary
                  loading={savingCompanyLoading}
                  onClick={submitCompany}
                >
                  Save
                </Button>
              )
          }
        </Form>
      </Wrapper>
    </>
  );
};

Company.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
  captureCompany: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureUser: payload => dispatch({
    type: CAPTURE_USER,
    payload,
  }),
  captureCompany: payload => dispatch({
    type: CAPTURE_COMPANY,
    payload,
  }),
});

export default connect(
  ({
    userReducer,
    company,
  }) => ({
    userReducer,
    company,
  }),
  mapDispatchToProps,
)(Company);
