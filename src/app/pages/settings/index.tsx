import { useEffect } from "react";
import { deleteProductAsync, getProductsAsync, selectProducts } from "../../shared/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { useNavigate } from "react-router-dom";
import { updateCartProducts } from "../../shared/redux/features/cart/cart.slice";

import CardItem from "../../shared/components/card-item";
import Loader from "../../shared/components/loader";

import styles from './styles.module.css';
import Button from "../../shared/components/button";

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Subscribe to Store Products.
  const productsData = useAppSelector(selectProducts);

  useEffect(() => {
    if (productsData.products.length === 0) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productsData.products.length]);

  const onDelete = async (id: number) => {
    dispatch(deleteProductAsync(id));
  }

  useEffect(() =>{
    dispatch(updateCartProducts(productsData.products));
  },[productsData.products]);

  return (
    <div className="responsiveContainer">
      <h1>Products Settings</h1>
      <div className={styles.newItem}>
        <Button label="ADD NEW" onClick={() => navigate('/settings/products')} />
      </div>

      {productsData.isLoading &&
        <Loader />
      }

      {!productsData.isLoading &&
        <div className={styles.gridCard}>
          {
            productsData.products.map((product) =>
              <CardItem
                key={product.id}
                isLoading={product.isUpdating}
                name={product.name}
                imageSrc={product.imageSrc}
                price={product.price}
                backgroundColorOne="primary"
                backgroundColorTwo="warn"
                labelButtonOne={'EDIT'}
                labelButtonTwo={'DELETE'}
                onButtonOneClick={() => navigate(`/settings/products/${product.id}`)}
                onButtonTwoClick={() => onDelete(product.id)}
              />
            )
          }
        </div>
      }
    </div>
  )
}
