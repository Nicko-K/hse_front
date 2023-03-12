import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EButtonVariant } from '../../../components/button';
import { CheckBox } from '../../../components/checkbox';
import { RadioButton } from '../../../components/radiobutton';
import { ITask } from '../../../models/tasks';
import { AppDispatch } from '../../../store';
import { fetchCreateTask, fetchUpdateTask } from '../../../store/actions/appState';
import { selectTaskDetail } from '../../../store/selectors/appState';
import { setTaskDesc, setTaskDetail, setTaskIsDone, setTaskName, setTaskPriority } from '../../../store/slices/appState';
import { ID_DESC_INPUT, ID_NAME_INPUT } from '../../../utils/constans';
import styles from './styles.module.scss';

export const TaskDetail = () => {
    const data = useSelector(selectTaskDetail) as ITask | null;
    const dispatch = useDispatch<AppDispatch>();

    const handleCloseTaskDetail = () => {
        dispatch(setTaskDetail(null));
    };

    const handleStopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const onSave = async () => {
        if (!data) {
            return;
        }
        if (!data.id) {
            dispatch(fetchCreateTask(data));
        } else {
            dispatch(fetchUpdateTask(data));
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTaskName(event.target.value));
    };

    const handleChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTaskDesc(event.target.value));
    };

    const handleChangeIsDone = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!data || !data.id) {
            return;
        }
        dispatch(setTaskIsDone(event.target.checked));
    };

    const handleChangePriorityLow = (id: "low") => {
        if (!data || !data.id) {
            return;
        }
        dispatch(setTaskPriority(id));
    };

    const handleChangePriorityMedium = (id: "medium") => {
        if (!data || !data.id) {
            return;
        }
        dispatch(setTaskPriority(id));
    };

    const handleChangePriorityHight = (id: "hight") => {
        if (!data || !data.id) {
            return;
        }
        dispatch(setTaskPriority(id));
    };


    if (!data) {
        return null;
    }

    return (
        <div className={styles.wrapper} onMouseDown={handleCloseTaskDetail}>
            <div className={styles.modal} onMouseDown={handleStopPropagation}>
                <p className={styles.title}>{`${!data.id ? 'Создать' : 'Редактировать'} задачу`}</p>
                <label
                    htmlFor={ID_NAME_INPUT}
                    className={styles.label}>
                    Название
                </label>
                <input
                    id={ID_NAME_INPUT}
                    className={styles.name}
                    value={data.name}
                    onChange={handleChangeName}/>
                <label
                    htmlFor={ID_DESC_INPUT}
                    className={styles.label}>
                    Описание
                </label>
                <textarea
                    className={styles.desc}
                    value={data.description}
                    onChange={handleChangeDesc}/>
                <div className="RadioButtons">
                    <RadioButton
                        id={"hight"}
                        onChange={handleChangePriorityHight}
                        checked={data.priority == "hight" ? true : false}>
                            Высокий
                    </RadioButton>
                    <RadioButton
                        id={"medium"}
                        onChange={handleChangePriorityMedium}
                        checked={data.priority == "medium" ? true : false}>
                            Средний
                    </RadioButton>
                    <RadioButton
                        id={"low"}
                        onChange={handleChangePriorityLow}
                        checked={data.priority == "low" ? true : false}>
                            Никзкий
                    </RadioButton>
                </div>
                <CheckBox
                    isDisabled={!data.id}
                    isChecked={data.isDone}
                    onChange={handleChangeIsDone}>
                    Выполнено ?
                </CheckBox>
                <div className={styles.footer}>
                    <Button
                        variant={EButtonVariant.CANCEL}
                        onClick={handleCloseTaskDetail}>
                        Отменить
                    </Button>
                    <Button onClick={onSave}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    );
};
