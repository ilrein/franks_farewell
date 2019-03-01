import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './pages/Home';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import VerificationSent from './pages/Auth/VerificationSent';
import Dashboard from './pages/Dashboard';

// Layouts
import MainLayout from './layouts/MainLayout';
// import BasicLayout from './layouts/BasicLayout';


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
      <ToastContainer />
    </Wrapper>
  </Router>
);

export default Routes;
