import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCart } from '../../redux/features/cart/cart.slice';

import ProductModel from '../../models/product.model';

import styles from './styles.module.css';
import cartImage from '../../../../assets/images/cart.png';
import reduxLogo from '../../../../assets/images/redux-logo.png';
import settingsIcon from '../../../../assets/images/settings.png';
import { getProductsAsync, selectProducts } from '../../redux/features/products/product.slice';

function Header() {
    const dispatch = useAppDispatch();
    const refResultsWrapper = useRef<HTMLDivElement>(null);
    const firstUpdate = useRef<boolean>(true);
    const isTimeout = useRef<boolean>(false);
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [shouldAnimateCart, setShouldAnimateCart] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [cartLength, setCartLength] = useState<number>(0);
    const [gifSrc, setGifSrc] = useState<string>('https://ricardohs-images.s3.ca-central-1.amazonaws.com/cart-loop.gif');

    // Subscribe to Store Cart.
    const productData = useAppSelector(selectProducts);
    const cartData = useAppSelector(selectCart);

    useEffect(() => {       
        if (!firstUpdate.current && cartLength != cartData.cart.length) {
            setCartLength(cartData.cart.length);
            setShouldAnimateCart(true);
            if (!isTimeout.current) {
                setGifSrc('https://ricardohs-images.s3.ca-central-1.amazonaws.com/cart-loop.gif')
                isTimeout.current = true;
                setTimeout(() => {
                    isTimeout.current = false
                    setGifSrc('');
                    setShouldAnimateCart(false);
                }, 1860);
            }
        }
        firstUpdate.current = false;
    }, [cartData])

    useEffect(() => {
        const onSearch = async () => {
            setSearchValue(searchValue);
            let items;
            if (productData.products.length > 0) {
                items = productData.products
                    .filter((item: ProductModel) => item.name.toLowerCase()
                        .includes(searchValue.toLowerCase())
                    );
                setProducts(items);
            } else {
                dispatch(getProductsAsync());
            }
        }

        if (isSearchOpened) {
            onSearch();
        }
    }, [searchValue, isSearchOpened, productData.products, dispatch]);

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
                <div onClick={() => navigate('/')}>
                    <h1 className={styles.headerTitle}>Game Store</h1>
                </div>

                <div ref={refResultsWrapper} className={styles.headerInputContainer}>
                    <input value={searchValue} className={styles.headerInput} onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search" />

                    {isSearchOpened &&
                        <div className={styles.headerInputResults}>
                            {products.map(product =>
                                <div onClick={() => { setIsSearchOpened(false); navigate(`/product/${product.id}`) }} key={product.id} className={styles.headerInputResultsItem}>
                                    <div className={styles.backgroundImage} style={{ backgroundImage: `url(${product.imageSrc})` }}></div>
                                    <p style={{ flex: 3 }}>{product.name.slice(0, 20)}</p>
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className={styles.headerCartContainer}>
                    <div className={styles.headerCartWrapper}>
                        <div onClick={() => navigate('/cart')}>
                            <img src={cartImage} alt='Cart' className={styles.cartImage} />
                            {shouldAnimateCart &&
                                <img className={styles.cartGif} src={gifSrc} alt="Animated Cart" />
                            }
                        </div>

                        <div className={styles.adminContainer} onClick={() => navigate('/settings')}>
                            <div className={styles.adminItem}>
                                <img className={styles.settingsIcon} src={settingsIcon} alt='Settings' />
                            </div>
                        </div>
                    </div>
                    {cartData.cart.length > 0 &&
                        <div className={styles.headerCartCounter}>
                            <p className={styles.headerCartCounterText}>{cartData.cart.length}</p>
                        </div>
                    }
                </div>

                <img src={reduxLogo} className={styles.headerImage} alt='Redux Logo' />
            </div>
        </div>
    )
}

export default Header;