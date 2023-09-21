import React from 'react';
import styled from 'styled-components';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const NewProducts = ({ products }) => {
  return (
    <ProductsGrid>
      {products?.length > 0 &&
        products.map((product) => <div key={product._id}>{product.title}</div>)}
    </ProductsGrid>
  );
};

export default NewProducts;
