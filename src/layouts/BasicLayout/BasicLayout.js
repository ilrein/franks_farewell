import React from 'react';
import styled from 'styled-components';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
  background-color: #eee;
`;


const BasicLayout = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default BasicLayout;
