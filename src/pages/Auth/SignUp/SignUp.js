import React, { Component } from 'react';
import {
  Container,
  Form,
  Header,
  Segment,
  Divider,
  Message,
  Checkbox,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
  animation: ${fadeIn} 1s ease;
`;

class SignUp extends Component {
  state = {
    // UI phases
    loading: false,

    // fields
    email: '',
    password: '',
    passwordConfirmation: '',
    type: 'specialist',

    // errors
    emailTooShort: false,
    passwordTooShort: false,
    passwordsDontMatch: false,
    cognitoErrorMessage: null,
  }
  /**
   * sets a state value dynamically
   */
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
      type,
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
          'custom:type': type,
        },
      })
        .then(() => {
          toast.success(`Successfully created ${email}`);
          history.push('/verify');
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
      type,

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

              <Form.Field>
                <Checkbox
                  label="I am looking for work"
                  name="type"
                  onChange={(event, data) => this.setValue(data)}
                  value="specialist"
                  checked={type === 'specialist'}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="I am looking for contractors"
                  name="type"
                  onChange={(event, data) => this.setValue(data)}
                  value="admin"
                  checked={type === 'admin'}
                />
              </Form.Field>

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
