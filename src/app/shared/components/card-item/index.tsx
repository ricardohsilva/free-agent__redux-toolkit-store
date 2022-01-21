import styles from './styles.module.css';
import Button from '../button';

interface IProps {
    id: number;
    name: string;
    imageSrc: string;
    price: string;
    labelButtonOne: string;
    labelButtonTwo?: string;
    backgroundColorOne: 'primary' | 'secondary' | 'warn';
    backgroundColorTwo?: 'primary' | 'secondary' | 'warn';
    onButtonOneClick: React.Dispatch<number>;
    onButtonTwoClick?: React.Dispatch<number>;
}

function CardItem({
    id,
    name,
    imageSrc,
    price,
    labelButtonOne,
    labelButtonTwo,
    backgroundColorOne,
    backgroundColorTwo,
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
        <div className={styles.cardItem}>
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
                <Button label={labelButtonOne} onClick={() => onButtonOneClick(id)} backgroundColor={getButtonColor(backgroundColorOne)}></Button>
                {onButtonTwoClick &&
                    <Button label={labelButtonTwo ? labelButtonTwo : ''} onClick={() => onButtonTwoClick(id)} backgroundColor={getButtonColor(backgroundColorTwo ? backgroundColorTwo : 'primary')}></Button>
                }
            </div>
        </div>
    )
}

export default CardItem;