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
  Link,
  withRouter,
} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
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
    Auth.signOut()
      .then(() => history.push('/'));
  };

  render() {
    const {
      visible,
    } = this.state;
    const {
      children,
      history,
    } = this.props;

    return (
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

            <Link to="/dashboard">
              <Menu.Item as="a">
                <Icon name="dashboard" />
                Dashboard
              </Menu.Item>
            </Link>

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
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(MainLayout);
