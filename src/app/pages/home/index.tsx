import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { selectProducts, getProductsAsync } from "../../shared/redux/features/products/product.slice";

import Loader from "../../shared/components/loader";
import CardItem from "../../shared/components/card-item";

import styles from './styles.module.css';
import { addToCart } from "../../shared/redux/features/cart/cart.slice";


export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  // Subscribe to Store Products and Cart.
  const productsData = useAppSelector(selectProducts);

  // Using Redux Async as soon the Component is loaded.
  useEffect(() => {
    if (productsData.products.length === 0) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productsData.products.length]);


  const onCartAdd = (id: number) => {
    const product = productsData.products.find((item) => item.id === id);
    if (product) {
      dispatch(addToCart(product));
    }
  }

  const onButtonTwoClick = (id: number) => {
    navigate(`/product/${id}`);
  }


  return (
    <div className="responsiveContainer">
      <h1>Products</h1>

      {productsData.isLoading &&
        <Loader />
      }

      <div className={styles.gridCard}>
        {
          productsData.products.map((product) =>
            <CardItem
              key={product.id}
              name={product.name}
              imageSrc={product.imageSrc}
              price={product.price}
              backgroundColorOne="primary"
              backgroundColorTwo="secondary"
              labelButtonOne={'ADD TO CART'}
              labelButtonTwo={'MORE DETAILS'}
              onButtonOneClick={() => onCartAdd(product.id)}
              onButtonTwoClick={() => onButtonTwoClick(product.id)}
            />
          )
        }
      </div>
    </div>
  )
}