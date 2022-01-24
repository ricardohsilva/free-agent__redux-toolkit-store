import styles from './styles.module.css';
import Button from '../button';
import Loader from '../loader';

interface IProps {
    isLoading?: boolean
    name: string;
    imageSrc: string;
    price: string;
    labelButtonOne: string;
    labelButtonTwo?: string;
    backgroundColorOne: 'primary' | 'secondary' | 'warn';
    backgroundColorTwo?: 'primary' | 'secondary' | 'warn';
    onButtonOneClick: React.Dispatch<boolean>;
    onButtonTwoClick?: React.Dispatch<boolean>;
}

function CardItem({
    name,
    imageSrc,
    price,
    labelButtonOne,
    labelButtonTwo,
    backgroundColorOne,
    backgroundColorTwo,
    isLoading,
    onButtonOneClick,
    onButtonTwoClick
}: IProps) {

    const getButtonColor = (background: 'primary' | 'secondary' | 'warn'): string => {
        switch (background) {
            case 'primary':
                return '#6f4cb6';
            case 'secondary':
                return '#282c34';
            default:
                return '#E60965';
        }

    }
    return (
        <div className={styles.cardContainer} >
            <div className={styles.cardItem}>
                {isLoading &&
                    <>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardLoaderContainer}>
                            <Loader />
                        </div>
                    </>
                }
                <div className={styles.backgroundImage} style={{ backgroundImage: `url(${imageSrc})` }}></div>
                <div className={styles.cardInner}>
                    <p>
                        <b>CAD${price}</b>
                    </p>
                    <p className={styles.cardName}>
                        <b>{name}</b>
                    </p>
                </div>
                <div className={styles.cardButton}>
                    <Button label={labelButtonOne} onClick={() => onButtonOneClick(true)} backgroundColor={getButtonColor(backgroundColorOne)}></Button>
                    {onButtonTwoClick &&
                        <Button label={labelButtonTwo ? labelButtonTwo : ''} onClick={() => onButtonTwoClick(true)} backgroundColor={getButtonColor(backgroundColorTwo ? backgroundColorTwo : 'primary')}></Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CardItem;