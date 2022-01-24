import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { getProductByIdAsync, selectProducts } from "../../shared/redux/features/products/product.slice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../shared/redux/features/cart/cart.slice";

import Loader from "../../shared/components/loader";
import Button from "../../shared/components/button";
import styles from './styles.module.css';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Subscribe to Store Products and Cart.
  const productsData = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductByIdAsync(Number(id)));
  }, [dispatch, id]);

  return (
    <div className="responsiveContainer">
      {productsData.isLoading &&
        <Loader />
      }

      {!productsData.selectedProduct?.id && !productsData.isLoading &&
        <h3 className={styles.notFound}>
          <b>Product Not found</b>
        </h3>
      }
      {productsData.selectedProduct?.id && !productsData.isLoading &&
        <div>
          <h1>Product Details - {productsData.selectedProduct.name}</h1>

          <div className={styles.detailsContainer}>

            <div className={styles.detailsRight}>
              <div className={styles.detailsImage} style={{ backgroundImage: `url(${productsData.selectedProduct.imageSrc})` }}></div>
              <p><b>Price CAD$ {productsData.selectedProduct.price}</b></p>
              <Button label={'Add To Cart'} onClick={() => { if (productsData.selectedProduct) dispatch(addToCart(productsData.selectedProduct)) }} />
            </div>

            <div className={styles.detailsLeft}>
              <iframe className={styles.detailsVideo} src={productsData.selectedProduct.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
