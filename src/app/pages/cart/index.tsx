import { removeFromCart, selectCart } from "../../shared/redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { useNavigate } from "react-router-dom";

import CardItem from "../../shared/components/card-item";
import styles from './styles.module.css';


export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Subscribe to Store Cart.
  const cartData = useAppSelector(selectCart);

  const remove = (id: number) => {
    dispatch(removeFromCart(id));
  }

  const moreDetails = (id: number) => {
    navigate(`/product/${id}`);
  }

  const getTotalCart = (): number => {
    let finalPrice: number = 0;
    cartData.cart.forEach(product => {
      finalPrice += Number(product.price);
    });
    return finalPrice;
  }

  return (
    <div className="responsiveContainer">
      <h1>My Cart</h1>
      <p className={styles.totalText}>Total: CAD$ {getTotalCart()}.00</p>
      <div className={styles.gridCard}>
        {
          cartData.cart.map((product) =>
            <CardItem
              key={`${Math.floor(Math.random() * 100000)}-${product.id}`}
              id={product.id}
              name={product.name}
              imageSrc={product.imageSrc}
              price={product.price}
              labelButtonOne="MORE DETAILS"
              labelButtonTwo="REMOVE"
              backgroundColorOne="secondary"
              backgroundColorTwo="warn"
              onButtonOneClick={(id) => moreDetails(id)}
              onButtonTwoClick={(id) => remove(id)}
            />
          )
        }
      </div>
      {cartData.cart.length === 0 &&
        <h2 className={styles.emptyCart}>Your Cart is Empty.</h2>
      }
    </div >
  )
}