import { useDispatch, useSelector } from "react-redux"
import { selectIsError } from "../../store/selectors/appState"
import { AppDispatch } from "../../store";
import styles from './styles.module.scss';
import { setIsError } from "../../store/slices/appState";
import { Button } from "../../components/button";


export const ErrorPopup = () => {
    const isError = useSelector(selectIsError);
    const dispatch = useDispatch<AppDispatch>();
    
    const handleCloseErrorPopup = () => {
        dispatch(setIsError(false));
    };
    
    const handleStopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };
    
    if (!isError) {
        return null;
    }
    
    return (
        <div className={styles.wrapper} onMouseDown={handleCloseErrorPopup}>
            <div className={styles.modal} onMouseDown={handleStopPropagation}>
                <p className={styles.title}>
                    {'Ошибка :('}
                </p>
                <p className={styles.message}>
                    К сожалению произошла ошибка. Попробуйте повторить попытку позже.
                </p>
                <div className={styles.footer}>
                    <Button onClick={handleCloseErrorPopup}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
};
