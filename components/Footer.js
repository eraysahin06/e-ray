import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 30px;
  width: 100%;
  background-color: #1d9ce8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; 2023 - Eray Sahin</p>
    </StyledFooter>
  );
};

export default Footer;
