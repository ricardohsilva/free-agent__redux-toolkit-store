import { useEffect } from "react";
import { getProductsAsync, selectProducts } from "../../shared/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { useNavigate } from "react-router-dom";

import CardItem from "../../shared/components/card-item";
import Loader from "../../shared/components/loader";

import styles from './styles.module.css';
export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Subscribe to Store Products.
  const productsData = useAppSelector(selectProducts);

  // Using Redux Async as soon the Component is loaded.
  useEffect(() => {
    if (productsData.products.length === 0) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productsData.products.length]);

  return (
    <div className="responsiveContainer">
      <h1>Products Settings</h1>

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
              backgroundColorOne="primary"
              labelButtonOne={'EDIT'}
              onButtonOneClick={(id) => navigate(`/settings/${product.id}`)}
            />
          )
        }
      </div>
    </div>
  )
}
