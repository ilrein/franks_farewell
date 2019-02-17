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
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import fadeIn from '../../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0;
  background-color: #eee;
  animation: ${fadeIn} 1s ease;
`;

class SignIn extends Component {
  state = {
    loading: false,
    email: '',
    password: '',
    errorMsg: null,
  }

  componentDidMount() {
    //
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
    } = this.state;
    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }), () => {
      Auth.signIn({
        username: email,
        password,
      })
        .then(() => history.push('/dashboard'))
        .catch(({ message }) => {
          this.setState(prevState => ({
            ...prevState,
            loading: false,
            errorMsg: message,
          }));
        });
    });
  }

  render() {
    const {
      loading,
      // email,
      // password,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Container>
          <Header as="h1">
            Sign In
          </Header>
          <Segment
            color="blue"
          >
            {
              errorMsg
                ? (
                  <Message error>
                    {errorMsg}
                  </Message>
                )
                : null
            }
            <Form>
              <Form.Input
                label="Email"
                type="email"
                name="email"
                onChange={(event, data) => this.setValue(data)}
              />

              <Form.Input
                label="Password"
                type="password"
                name="password"
                onChange={(event, data) => this.setValue(data)}
              />

              <Divider />

              <Form.Field>
                <Link to="/sign-up">
                  Register an account
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

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(SignIn);
