import React from 'react';
import styled from 'styled-components';

const StyledOrder = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
  time {
    font-size: 1rem;
    font-weight: bold;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    font-weight: 700;
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin-top: 5px;
  color: #888;
`;

const SingleOrder = ({ line_items, createdAt, ...rest }) => {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString('en-CA')}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email} <br />
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city} <br />
          {rest.country}
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={item}>
            <span>{item.quantity}</span> x {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
};

export default SingleOrder;
