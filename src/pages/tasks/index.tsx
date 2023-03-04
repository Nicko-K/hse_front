import { Header } from '../../components/header';
import { TaskControlBar } from './taskControlBar';
import { TaskDetail } from './taskDetail';
import { TaskList } from './taskList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchTasks } from '../../store/actions/appState';
import styles from './styles.module.scss';
import { ErrorPopup } from '../error';

export const TasksPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Header />
                <TaskList />
                <TaskControlBar />
                <TaskDetail />
                <ErrorPopup />
            </div>
        </div>
    );
};
