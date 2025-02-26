import React, { useState } from 'react';

function EmployeeMenu() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, createdBy: 'USER_ID' }), // Замените USER_ID на реальный ID
    });
    if (response.ok) {
      alert('Задача создана!');
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Создать задачу</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default EmployeeMenu;