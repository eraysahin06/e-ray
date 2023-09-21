import Featured from '@/components/Featured';
import Header from '@/components/Header';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';

const HomePage = ({ product }) => {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const featuredProductId = '6508af11780a3272aa323091';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
