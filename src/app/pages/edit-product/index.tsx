import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectProducts } from "../../shared/redux/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";

import Loader from "../../shared/components/loader";

import ProductService from "../../shared/services/product.service";
import ProductModel from "../../shared/models/product.model";

import styles from './styles.module.css';

export default function EditProductPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductModel | undefined>();
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productImage, setProductImage] = useState<string>('');
  const [productVideo, setProductVideo] = useState<string>('');
  const productService = new ProductService();


  const dispatch = useAppDispatch();

  // Subscribe to Store Products.
  const productsData = useAppSelector(selectProducts);

  useEffect(() => {
    setIsLoading(true);
    const productService = new ProductService();
    let isMounted: boolean = true;
    let selectedProduct: ProductModel | undefined;

    const loadProduct = async () => {
      if (productsData.products.length === 0) {
        selectedProduct = await productService.getById(Number(id));
      } else {
        selectedProduct = productsData.products.find(item => item.id === Number(id));
      }

      if (selectedProduct) {
        setProductName(selectedProduct.name);
        setProductPrice(selectedProduct.price);
        setProductImage(selectedProduct.imageSrc);
        setProductVideo(selectedProduct.videoUrl);
      }

      if (isMounted) {
        setProduct(selectedProduct);
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    }
  }, [productsData.products, id, dispatch]);


  const handleSubmit = (event: React.SyntheticEvent) => {
    const data: ProductModel = {
      name: productName,
      imageSrc: productImage,
      videoUrl: productVideo,
      price: productPrice,
      id: Number(id)
    }
    productService.save(Number(id), data);
  }

  return (
    <div className="responsiveContainer">
      {isLoading &&
        <Loader />
      }

      {!isLoading &&
        <>
          <h1>Edit Product - {product?.name}</h1>


          <div className={styles.formContainer}>
            <div className={styles.detailsImage} style={{ backgroundImage: `url(${productImage})` }}></div>
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

              <input type="submit" value="Update" />
            </form>
          </div>
        </>
      }
    </div>
  )
}
