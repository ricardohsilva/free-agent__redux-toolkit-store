import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { selectProducts, getProductsAsync } from "../../shared/redux/features/products/product.slice";

import Header from "../../shared/components/header";
import CardItem from "../../shared/components/card-item";

import styles from './styles.module.css';
import Loader from "../../shared/components/loader";


export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Subscribe to Store Products.
  const data = useAppSelector(selectProducts);


  // Using Redux Async as soon the Component is loaded.
  useEffect(() => {
    if (data.products.length === 0) {
      dispatch(getProductsAsync());
    }
  }, [dispatch]);


  const onButtonOneClick = (id: number) => {
    console.log('Button One')
  }

  const onButtonTwoClick = (id: number) => {
    navigate(`/product/${id}`);
  }


  return (

    <div>
      <Header />
      <div className="responsiveContainer">
        <h1>Products</h1>

        {data.isLoading &&
          <Loader />
        }

        <div className={styles.gridCard}>
          {
            data.products.map((product) =>
              <CardItem
                key={product.id}
                id={product.id}
                name={product.name}
                imageSrc={product.imageSrc}
                price={product.price}
                onButtonOneClick={(id) => onButtonOneClick(id)}
                onButtonTwoClick={(id) => onButtonTwoClick(id)}
              />
            )
          }
        </div>
      </div>
    </div >

  )
}