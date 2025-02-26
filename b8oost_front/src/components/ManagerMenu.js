import React, { useEffect, useState } from 'react';

function ManagerMenu() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/tasks/pending')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleReview = async (taskId, status) => {
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reviewedBy: 'MANAGER_ID' }), // Замените MANAGER_ID на реальный ID
    });
    if (response.ok) {
      setTasks(tasks.filter(task => task._id !== taskId));
    }
  };

  return (
    <div>
      <h2>Задачи на рассмотрение</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Создано: {task.createdBy.name}</p>
            <button onClick={() => handleReview(task._id, 'approved')}>Одобрить</button>
            <button onClick={() => handleReview(task._id, 'rejected')}>Отклонить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerMenu;