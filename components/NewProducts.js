import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const NewProducts = ({ products, wishedProducts }) => {
  return (
    <Center>
      <Title>New Products</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
};

export default NewProducts;
