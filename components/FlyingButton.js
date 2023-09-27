import { primary } from '@/lib/colors';
import styled from 'styled-components';
import { ButtonStyle } from './Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from './CartContext';

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    ${(props) =>
      props.main
        ? `  background-color: ${primary};
    color: #fff;`
        : `   background-color: transparent;
    border: 2px solid ${primary};
    font-weight: bold;
    color: ${primary};`}

    ${(props) =>
      props.white &&
      `
    background-color: #fff;
    border: 1px solid #fff;
      padding: 10px 20px;
    font-weight: 500;
    font-size: 16px;

    `}
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  const imgRef = useRef(null);

  function sendImageToCart(e) {
    if (imgRef.current) {
      imgRef.current.style.display = 'inline-block';
      imgRef.current.style.left = e.clientX - 50 + 'px';
      imgRef.current.style.top = e.clientY - 50 + 'px';
      setTimeout(() => {
        imgRef.current.style.display = 'none';
      }, 1000);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current
        ? imgRef.current.closest('div[data-sr-id]')
        : null;
      if (reveal && reveal?.style && reveal?.style.opacity === '1') {
        reveal.style.transform = 'none';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}
      >
        <img ref={imgRef} src={props.src} alt="placed photo of product" />

        <button onClick={(e) => sendImageToCart(e)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
