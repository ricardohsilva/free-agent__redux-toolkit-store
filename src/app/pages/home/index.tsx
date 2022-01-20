import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { selectProducts, getProductsAsync } from "../../shared/redux/features/products/product.slice";

import Loader from "../../shared/components/loader";
import Header from "../../shared/components/header";
import CardItem from "../../shared/components/card-item";

import styles from './styles.module.css';
import { addToCart, selectCart } from "../../shared/redux/features/cart/cart.slice";


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
  }, [dispatch]);


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

    <div>
      <Header />
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
                id={product.id}
                name={product.name}
                imageSrc={product.imageSrc}
                price={product.price}
                onButtonOneClick={(id) => onCartAdd(id)}
                onButtonTwoClick={(id) => onButtonTwoClick(id)}
              />
            )
          }
        </div>
      </div>
    </div >

  )
}