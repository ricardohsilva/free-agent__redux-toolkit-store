import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { getProductsAsync, selectProducts } from "../../shared/redux/features/products/product.slice";
import { useParams } from "react-router-dom";

import Header from "../../shared/components/header";
import ProductService from "../../shared/services/product.service";
import ProductModel from "../../shared/models/product.model";
import Loader from "../../shared/components/loader";
import Button from "../../shared/components/button";
import styles from './styles.module.css';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductModel | undefined>();
  const dispatch = useAppDispatch();

  // Subscribe to Store Products.
  const data = useAppSelector(selectProducts);


  useEffect(() => {
    setIsLoading(true);
    const productService = new ProductService();
    let isMounted: boolean = true;
    let product: ProductModel | undefined;

    const loadProduct = async () => {
      if (!data.products.length) {
        product = await productService.getById(Number(id));
        dispatch(getProductsAsync());
      } else {
        product = data.products.find(item => item.id === Number(id));
      }

      if (isMounted) {
        setProduct(product);
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    }
  }, [data, id]);

  return (

    <div>
      <Header />
      <div className="responsiveContainer">
        {isLoading &&
          <Loader />
        }
        {product && !isLoading &&
          <div>
            <h1>Product Details - {product?.name}</h1>

            <div className={styles.detailsContainer}>
              <div className={styles.detailsWrapper}>


                <div className={styles.backgroundImage} style={{ backgroundImage: `url(${product.imageSrc})` }}></div>

                <div className={styles.detailsPriceContainer}>
                  <p><b>Price CAD$ {product.price}</b></p>
                  <Button label={'Add To Cart'} onClick={() => console.log('oi')} />
                </div>
              </div>

              <div className={styles.detailsDivider}></div>
              <iframe className={styles.detailsVideo} src={product.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
          </div>
        }
      </div>
    </div>

  )
}
