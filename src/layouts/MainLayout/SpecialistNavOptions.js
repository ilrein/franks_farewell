import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Icon,
} from 'semantic-ui-react';

import styled from 'styled-components';

const Hover = styled(Menu.Item)`
  &:hover {
    background: rgba(255,255,255,.08) !important;
    color: #fff !important;
  }
`;

const SpecialistNavOptions = () => (
  <>
    <Link to="/dashboard">
      <Hover>
        <Icon name="dashboard" />
        Dashboard
      </Hover>
    </Link>
  </>
);

export default SpecialistNavOptions;
