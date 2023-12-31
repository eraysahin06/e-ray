import Link from 'next/link';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Center from './Center';
import { CartContext } from './CartContext';
import BarsIcon from './icons/Bars';
import SearchIcon from './icons/SearchIcon';
import LogoIcon from './icons/LogoIcon';
import { primary } from '@/lib/colors';

const StyledHeader = styled.header`
  background-color: #1d9ce8;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobileNavActive ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #1d9ce8;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  min-width: 30px;
  width: 100px;
  text-align: center;
  border-radius: 5px;
  height: 30px;

  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    background-color: ${primary}; /* Change the background color on hover */
    color: #fff; /* Change the text color on hover */
    transition: background-color 0.1s ease; /* Add a smooth transition */
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: #fff;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Logo = styled(Link)`
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const StyledLogo = styled(Logo)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 110px;
`;

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <StyledLogo href={'/'}>
            <LogoIcon /> E - RAY
          </StyledLogo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
