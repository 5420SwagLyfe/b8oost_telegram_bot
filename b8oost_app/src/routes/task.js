const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Создание задачи (сотрудником)
router.post('/tasks', async (req, res) => {
  const { title, description, createdBy } = req.body;
  const task = new Task({ title, description, createdBy });
  await task.save();
  res.json(task);
});

// Получение задач на рассмотрение (для руководителя)
router.get('/tasks/pending', async (req, res) => {
  const tasks = await Task.find({ status: 'pending' }).populate('createdBy', 'name');
  res.json(tasks);
});

// Обновление статуса задачи (одобрить/отклонить)
router.put('/tasks/:id', async (req, res) => {
  const { status, reviewedBy } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status, reviewedBy },
    { new: true }
  );
  res.json(task);
});

// Получение истории задач
router.get('/tasks/history', async (req, res) => {
  const tasks = await Task.find({ status: { $in: ['approved', 'rejected'] } })
    .populate('createdBy', 'name')
    .populate('reviewedBy', 'name');
  res.json(tasks);
});

module.exports = router;