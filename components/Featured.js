import React, { useContext } from 'react';
import Center from './Center';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import FlyingButton from './FlyingButton';
import { RevealWrapper } from 'next-reveal';

const Bg = styled.div`
  background-color: #fff;
  color: #000;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #555;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;

    & > div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImgColumn = styled(Column)`
  & > div {
    width: 100%;
  }
`;

const ContentWrapper = styled.div``;

const Featured = ({ product }) => {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={'left'} delay={0}>
                <ContentWrapper>
                  <Title>{product.title}</Title>
                  <Desc>{product.description}</Desc>
                  <ButtonsWrapper>
                    <ButtonLink
                      href={'/product/' + product._id}
                      outline={'true'}
                      white={'true'}
                    >
                      View Product
                    </ButtonLink>
                    <FlyingButton _id={product._id} src={product.images?.[0]}>
                      <CartIcon />
                      Add to cart
                    </FlyingButton>
                  </ButtonsWrapper>
                </ContentWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img
                  className={'main'}
                  src={product.images?.[0]}
                  alt="featured product"
                />
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
