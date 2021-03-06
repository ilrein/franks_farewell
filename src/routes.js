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
import Company from './pages/Company';
import Locations from './pages/Locations';
import Shifts from './pages/Shifts';

// Layouts
import MainLayout from './layouts/MainLayout';
// import BasicLayout from './layouts/BasicLayout';

// Containers
// import CompanyContainer from './containers/CompanyContainer';

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

          <Route
            exact
            path="/company"
            component={Company}
          />

          <Route
            exact
            path="/locations"
            component={Locations}
          />

          <Route
            exact
            path="/shifts"
            component={Shifts}
          />
        </MainLayout>
      </Switch>
      <ToastContainer
        autoClose={3500}
      />
    </Wrapper>
  </Router>
);

export default Routes;
