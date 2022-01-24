import styles from './styles.module.css';

interface IProps {
    label: string;
    onClick?: React.Dispatch<React.SetStateAction<boolean>>;
    backgroundColor?: string;
}

function Button({ label, onClick, backgroundColor }: IProps) {
    return (
        <button className={styles.button} onClick={() => onClick ? onClick(true) : null}
            style={{ backgroundColor: backgroundColor ? backgroundColor : '#6f4cb6' }}>
            <b>{label}</b>
        </button>
    )
}

export default Button;