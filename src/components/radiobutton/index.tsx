import styles from './styles.module.scss';

interface IOptionProps {
    id: number
    value: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton = ({
    id,
    value,
    onChange,
    children,
}: React.PropsWithChildren<IOptionProps>) => {
    return (
        <div className={styles.wrapper}>
            <input
            type='radio' 
            checked={id === value} 
            name='priority'
            value={value} 
            onChange={onChange}
            />
            <label className={styles.label}>
                {children}
            </label>
        </div>
    );
};
