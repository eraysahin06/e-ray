import Center from '@/components/Center';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/Button';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import { RevealWrapper } from 'next-reveal';
import Input from '@/components/Input';
import axios from 'axios';
import Spinner from '@/components/Spinner';
import ProductBox from '@/components/ProductBox';
import Tabs from '@/components/Tabs';
import SingleOrder from '@/components/SingleOrder';

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const AccountPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn('google');
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrdersLoaded(false);

    axios.get('/api/address').then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });

    axios.get('/api/wishlist').then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });

    axios.get('/api/orders').then((response) => {
      setOrders(response.data);
      setOrdersLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishList(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Orders', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!ordersLoaded && <Spinner fullWidth={true} />}
                    {ordersLoaded && (
                      <div>
                        {orders.length === 0 && (
                          <p>Login to see your orders.</p>
                        )}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder key={o} {...o} />)}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={`true`} />}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 &&
                            wishedProducts.map((wp) => (
                              <ProductBox
                                key={wp._id}
                                {...wp}
                                wished={true}
                                onRemoveFromWishlist={
                                  productRemovedFromWishList
                                }
                              />
                            ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Your wishlist is empty.</p>}
                            {!session && (
                              <p>Login to add products to your wishlist.</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Account Details' : 'Login'}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      name="email"
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <CityHolder>
                      <Input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Input
                        name="postalCode"
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </CityHolder>
                    <Input
                      name="streetAddress"
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <Input
                      name="country"
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />

                    <Button black="true" block="true" onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </>
                )}
                {session && (
                  <Button onClick={logout} primary="true">
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary="true" onClick={login}>
                    Sign in with Google
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
};

export default AccountPage;
