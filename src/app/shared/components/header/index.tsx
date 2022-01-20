import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectCart } from '../../redux/features/cart/cart.slice';

import ProductService from '../../services/product.service';
import ProductModel from '../../models/product.model';

import styles from './styles.module.css';
import cartGif from '../../../../assets/gifs/cart.gif';
import cartSvg from '../../../../assets/svg/cart.svg';
import reduxLogo from '../../../../assets/images/redux-logo.png';

function Header() {
    const refResultsWrapper = useRef<HTMLDivElement>(null);
    const firstUpdate = useRef<boolean>(true);
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [shouldAnimateCart, setShouldAnimateCart] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState<ProductModel[]>([]);

    // Subscribe to Store Cart.
    const cartData = useAppSelector(selectCart);

    useEffect(() => {
        let isTimeout;
        if (!firstUpdate.current) {
            setShouldAnimateCart(true);
            if (!isTimeout) {
                // setIsTimeout(true);
                isTimeout = true;
                setTimeout(() => {
                    isTimeout = false
                    setShouldAnimateCart(false);
                }, 3000);
            }
        }

        firstUpdate.current = false;

    }, [cartData])

    useEffect(() => {
        const productService = new ProductService();
        let isMounted = true;

        const onSearch = async () => {
            setSearchValue(searchValue);
            const response: ProductModel[] = await productService.get(searchValue);
            if (isMounted) {
                setProducts(response);
            }
        }

        if (isSearchOpened) {
            onSearch();
        }


        return () => {
            isMounted = false;
        };
    }, [searchValue, isSearchOpened]);

    useEffect(() => {
        const handleClickOutside = (event: any): void => {
            if (refResultsWrapper.current && !refResultsWrapper.current.contains(event.target)) {
                setSearchValue('');
                setIsSearchOpened(false);
            } else {
                setIsSearchOpened(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refResultsWrapper]);

    return (

        <div className={styles.header}>
            <div className={styles.headerWrapper}>
                <div>
                    <h1 className={styles.headerTitle}>Game Store</h1>
                </div>

                <div ref={refResultsWrapper} className={styles.headerInputContainer}>
                    <input value={searchValue} className={styles.headerInput} onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search" />

                    {isSearchOpened &&
                        <div className={styles.headerInputResults}>
                            {products.map(product =>
                                <div onClick={() => { setIsSearchOpened(false); navigate(`/product/${product.id}`) }} key={product.id} className={styles.headerInputResultsItem}>
                                    <p>{product.name}</p>
                                </div>
                            )}
                        </div>
                    }

                </div>

                <div className={styles.headerCartContainer} onClick={() => navigate('/cart')}>
                    <img src={cartSvg} alt='Cart' className={styles.cartImage} />
                    {shouldAnimateCart &&
                        <img className={styles.cartGif} src={cartGif} alt="Animated Cart" />
                    }
                </div>

                <img src={reduxLogo} className={styles.headerImage} alt='Redux Logo' />
            </div>
        </div>
    )
}

export default Header;