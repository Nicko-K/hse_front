import { useSelector } from 'react-redux';
import { selectTasks } from '../../../store/selectors/appState';
import styles from './styles.module.scss';
import { TaskListItem } from './taskListItem';

export const TaskList = () => {
    // idk if selectTasks will copy the array or return a reference 
    // so, since I don't want to mutate it I will make a copy myself
    const tasks = [...useSelector(selectTasks)];
    
    // sort by priority in descending order
    tasks.sort((a, b) => {
        return b.priority - a.priority;
    });

    return (
        <main className={styles.wrapper}>
            {tasks.map((item) => {
                return (
                    <TaskListItem key={item.id} data={item}/>
                );
            })}
            {tasks.length === 0 && (
                <div className={styles.emptyList}>No tasks yet</div>
            )}
        </main>
    );
};
