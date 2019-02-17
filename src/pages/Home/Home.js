import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from './logo.svg';
import rotate from '../../anime/rotate';
import fadeIn from '../../anime/fadeIn';
import { APP_NAME } from '../../constants';

const Wrapper = styled.div`
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  animation: ${fadeIn} 1s ease;
`;

const Img = styled.img`
  animation: ${rotate} 5s linear infinite;
  height: 20rem;
  margin-bottom: 5rem;
`;

const HomePage = () => (
  <Wrapper>
    <Img
      src={logo}
      alt="logo"
    />

    <Link to="/dashboard">
      <h1>
        {APP_NAME}
      </h1>
    </Link>
  </Wrapper>
);

export default HomePage;
