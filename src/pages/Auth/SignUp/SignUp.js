import React, { Component } from 'react';
import {
  Container,
  Form,
  Header,
  Segment,
  Divider,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
  animation: ${fadeIn} 1s ease;
`;

class SignUp extends Component {
  state = {
    loading: false,

    // fields
    email: '',
    password: '',
    passwordConfirmation: '',

    // errors
    emailTooShort: false,
    passwordTooShort: false,
    passwordsDontMatch: false,
    cognitoErrorMessage: null,
  }

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  handleSubmit = () => {
    const { history } = this.props;
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;
    /**
     * form validations
     */
    if (email.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        emailTooShort: true,
      }));
      return;
    }

    if (password.length < 7) {
      this.setState(prevState => ({
        ...prevState,
        passwordTooShort: true,
      }));
      return;
    }
    /**
     * Check if passwords match
     */
    if (password !== passwordConfirmation) {
      this.setState(prevState => ({
        ...prevState,
        passwordsDontMatch: true,
      }));
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      emailTooShort: false,
      passwordTooShort: false,
      passwordsDontMatch: false,
      loading: true,
    }), () => {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      })
        .then(async ({ userSub }) => {
          // lets create a user type
          // with the new sub
          try {
            await fetch(`${process.env.REACT_APP_API_URL}/auth/create`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: {
                  sub: userSub,
                }
              }),
            });
            history.push('/verify');
          } catch (error) {
            console.log(error);
            this.setState(prevState => ({ ...prevState, loading: false }));
          }
        })
        .catch(({
          message,
        }) => this.setState(prevState => ({
          ...prevState,
          loading: false,
          cognitoErrorMessage: message,
        })));
    });
  }

  render() {
    const {
      loading,

      // fields
      email,
      password,
      passwordConfirmation,

      // errors
      emailTooShort,
      passwordTooShort,
      passwordsDontMatch,
      cognitoErrorMessage,
    } = this.state;

    return (
      <Wrapper
        className="fadeIn animated"
      >
        <Container>
          <Header as="h1">
            Sign Up
          </Header>
          <Segment
            color="blue"
          >
            {
              cognitoErrorMessage
                ? (
                  <Message error>
                    {cognitoErrorMessage}
                  </Message>
                )
                : null
            }
            <Form>
              <Form.Input
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(event, data) => this.setValue(data)}
                error={emailTooShort}
                required
              />

              <Form.Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(event, data) => this.setValue(data)}
                error={passwordTooShort}
                required
              />

              <Form.Input
                label="Password confirmation"
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(event, data) => this.setValue(data)}
                error={passwordsDontMatch}
                required
              />

              <Divider />

              <Form.Field>
                <Link to="/sign-in">
                  Login instead
                </Link>
              </Form.Field>

              <Form.Button
                onClick={this.handleSubmit}
                primary
                loading={loading}
              >
                Submit
              </Form.Button>
            </Form>
          </Segment>
        </Container>
      </Wrapper>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(SignUp);
