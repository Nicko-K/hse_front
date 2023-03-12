import React, { useState } from 'react';
import Task from './Task';

function TaskList(props) {
  const [sortOrder, setSortOrder] = useState('asc'); // состояние, хранящее порядок сортировки

  // функция для сортировки задач по приоритету
  function sortTasksByPriority(tasks) {
    return tasks.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.priority.localeCompare(b.priority);
      } else {
        return b.priority.localeCompare(a.priority);
      }
    });
  }

  // список задач, отсортированный по приоритету
  const sortedTasks = sortTasksByPriority(props.tasks);

  return (
    <div>
      <h2>{props.title}</h2>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      ))}
    </div>
  );
}

export default TaskList;
