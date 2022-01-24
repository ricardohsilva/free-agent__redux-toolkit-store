import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdAsync, saveProductAsync, selectProducts } from "../../shared/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import Loader from "../../shared/components/loader";
import ProductModel from "../../shared/models/product.model";
import styles from './styles.module.css';
import React from "react";
import Button from "../../shared/components/button";

export default function SettingsManageProductsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productImage, setProductImage] = useState<string>('');
  const [productVideo, setProductVideo] = useState<string>('');

  // Subscribe to Store Products.
  const productsData = useAppSelector(selectProducts);

  useEffect(() => {
    setProductName(productsData.selectedProduct ? productsData.selectedProduct.name : '');
    setProductPrice(productsData.selectedProduct ? productsData.selectedProduct.price : '');
    setProductImage(productsData.selectedProduct ? productsData.selectedProduct.imageSrc : '');
    setProductVideo(productsData.selectedProduct ? productsData.selectedProduct.videoUrl : '');

  }, [productsData.selectedProduct, id]);

  useEffect(() => {
    dispatch(getProductByIdAsync(Number(id)));
  }, [dispatch, id]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const model: ProductModel = {
      name: productName,
      imageSrc: productImage,
      videoUrl: productVideo,
      price: productPrice,
      id: Number(id)
    }
    dispatch(saveProductAsync(model));
  }

  return (
    <div className="responsiveContainer">
      {productsData.isLoading &&
        <Loader />
      }
      {!productsData.isLoading &&
        <>
          {productsData.selectedProduct &&
            <h1>Edit Product - {productsData.selectedProduct?.name}</h1>
          }
          {!productsData.selectedProduct &&
            <h1>Create a Product</h1>
          }
          <div className={styles.formContainer}>
            {productsData.selectedProduct &&
              <div className={styles.detailsImage} style={{ backgroundImage: `url(${productImage})` }}></div>
            }
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                type="text"
                placeholder="Insert the Product Name"
                name="productName"
                id="productName"
              />

              <label>Price</label>
              <input
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                type="number"
                min={0}
                id="productPrice"
                name="productPrice"
                placeholder="Insert the Price"
              />

              <label>Image URL</label>
              <input
                value={productImage}
                onChange={(event) => setProductImage(event.target.value)}
                type="text"
                id="productImage"
                name="productImage"
                placeholder="Insert Image URL..."
              />

              <label>Video Url</label>
              <input
                value={productVideo}
                onChange={(event) => setProductVideo(event.target.value)}
                type="text"
                id="productVideo"
                name="productVideo"
                placeholder="Insert Video URL..."
              />

              <div className={styles.buttonContainer}>
                <Button label={productsData.selectedProduct ? 'Save' : 'Create'} />
              </div>
            </form>
          </div>
        </>
      }
    </div>
  )
}
