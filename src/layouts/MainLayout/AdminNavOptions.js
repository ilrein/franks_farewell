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

const AdminNavOptions = () => (
  <>
    <Link to="/dashboard">
      <Hover>
        <Icon name="dashboard" />
        Dashboard
      </Hover>
    </Link>
    <Link to="/company">
      <Hover>
        <Icon name="building" />
        Company
      </Hover>
    </Link>
    <Link to="/locations">
      <Hover>
        <Icon name="building outline" />
        Locations
      </Hover>
    </Link>
  </>
);

export default AdminNavOptions;
