import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reduxLogo from '../../../../assets/images/redux-logo.png';
import styles from './styles.module.css';
import ProductService from '../../services/product.service';
import ProductModel from '../../models/product.model';



function Header() {
    const refResultsWrapper = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState<ProductModel[]>([]);


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

                <img src={reduxLogo} className={styles.headerImage} alt='Redux Logo' />
            </div>
        </div>
    )
}

export default Header;