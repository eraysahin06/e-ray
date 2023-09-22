import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const NewProducts = ({ products }) => {
  return (
    <Center>
      <Title>New Products</Title>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
