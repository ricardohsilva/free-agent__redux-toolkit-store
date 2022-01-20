import styles from './styles.module.css';
import Button from '../button';

interface IProps {
    id: number;
    name: string;
    imageSrc: string;
    price: string;
    onButtonOneClick: React.Dispatch<number>;
    onButtonTwoClick: React.Dispatch<number>;
}

function CardItem({ id, name, imageSrc, price, onButtonOneClick, onButtonTwoClick }: IProps) {
    return (
        <div className={styles.cardItem}>

            <div className={styles.cardImageBox}>
                <img src={imageSrc} alt="Card" className={styles.cardImage} />
            </div>

            <div className={styles.cardInner}>
                <p>
                    <b>CAD${price}</b>
                </p>
                <p className={styles.cardName}>
                    <b>{name}</b>
                </p>
                <p>
                    Switch
                </p>
                <p>
                    Stars
                </p>
            </div>

            <div className={styles.cardButton}>
                <Button label='ADD TO CARD' onClick={() => onButtonOneClick(id)}></Button>
                <Button label='MORE DETAILS' onClick={() => onButtonTwoClick(id)} backgroundColor={'#282c34'}></Button>
            </div>
        </div>
    )
}

export default CardItem;