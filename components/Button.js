import { primary } from '@/lib/colors';
import React from 'react';
import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: 000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: #1d9ce8;
      color: #fff;
      border: 1px solid #1d9ce8;
    `}


      ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}


    ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}

     ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

    ${(props) =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;

      svg {
        height: 20px;
      }
    `};

  ${(props) =>
    props.size === 'sm' &&
    css`
      font-size: 0.7rem;
      padding: 4px 5px;

      svg {
        height: 20px;
      }
    `};
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
