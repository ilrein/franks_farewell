import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

// Pages
import HomePage from './pages/Home';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import VerificationSent from './pages/VerificationSent';
import Dashboard from './pages/Dashboard';

// Layouts
import MainLayout from './layouts/MainLayout';

const Wrapper = styled.div`
  height: 100%;
`;

const Routes = () => (
  <Router>
    <Wrapper>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />

        <Route
          exact
          path="/sign-up"
          component={SignUp}
        />

        <Route
          exact
          path="/sign-in"
          component={SignIn}
        />

        <Route
          exact
          path="/verify"
          component={VerificationSent}
        />

        <MainLayout>
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
          />
        </MainLayout>
      </Switch>
    </Wrapper>
  </Router>
);

export default Routes;
