import React, { useEffect, useState } from 'react';

function TaskHistory() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/tasks/history')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div>
      <h2>История задач</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Создано: {task.createdBy.name}</p>
            <p>Статус: {task.status === 'approved' ? 'Одобрено' : 'Отклонено'}</p>
            <p>Рассмотрено: {task.reviewedBy?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskHistory;