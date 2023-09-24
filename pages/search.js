import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductsGrid from '@/components/ProductsGrid';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

const SearchPage = () => {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get('/api/products?phrase=' + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SearchInput
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            autoFocus="true"
            placeholder="Search for a product.."
          />
        </InputWrapper>

        {!isLoading && phrase !== '' && products.length == 0 && (
          <h2>No products found four query &quot;{phrase}&quot;</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
};

export default SearchPage;
