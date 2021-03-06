import React, { Component } from 'react'
import {
  Button,
  Menu,
  Segment,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import {
  withRouter,
} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import {
  CLEAR_USER,
} from '../../constants';
import AuthContainer from '../../containers/AuthContainer';
import UserContainer from '../../containers/UserContainer';

import fadeIn from '../../anime/fadeIn';
import AdminNavOptions from './AdminNavOptions';
import SpecialistNavOptions from './SpecialistNavOptions';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
  background-color: green;
`;

const Brand = styled.div`
  padding: 1rem;
  color: white;
  font-size: 1.1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

class MainLayout extends Component {
  state = {
    visible: false,
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      ...prevState,
      visible: !prevState.visible,
    }));
  }

  logout = (history) => {
    const { clearUser } = this.props;

    Auth.signOut()
      .then(() => {
        toast.info('Signed out');
        history.push('/');
        localStorage.clear();
        clearUser();
      });
  };

  render() {
    const {
      visible,
    } = this.state;

    const {
      children,
      history,
      user,
    } = this.props;

    return (
      <AuthContainer>
        <UserContainer>
          <Wrapper>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation="push"
                icon="labeled"
                inverted
                vertical
                visible={visible}
                width="thin"
              >
                <Brand>
                  ScriptumStyle
                </Brand>

                {
                  user &&
                  user.type === 'admin'
                    ? <AdminNavOptions />
                    : null
                }

                {
                  user &&
                  user.type === 'specialist'
                    ? <SpecialistNavOptions />
                    : null
                }

                <Menu.Item
                  as="a"
                  onClick={() => this.logout(history)}
                >
                  <Icon name="log out" />
                  Log Out
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher
                dimmed={visible}
                onClick={visible ? this.toggleVisibility : null}
              >
                <Segment
                  basic
                >
                  <HeaderWrapper>
                    <Button
                      basic
                      icon="sidebar"
                      onClick={this.toggleVisibility}
                    />
                  </HeaderWrapper>
                  {children}
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Wrapper>
        </UserContainer>
      </AuthContainer>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape(),
  clearUser: PropTypes.func.isRequired,
};

MainLayout.defaultProps = {
  user: {},
};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
  dispatch => ({
    clearUser: () => dispatch({
      type: CLEAR_USER,
    }),
  }),
)(withRouter(MainLayout));
