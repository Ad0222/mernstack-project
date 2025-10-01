const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const task = await Task.create({
    title, description, dueDate, priority, createdBy: req.user._id
  });
  res.json(task);
});

// Get Tasks with pagination
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const total = await Task.countDocuments({ createdBy: req.user._id });
  const tasks = await Task.find({ createdBy: req.user._id })
    .skip(skip).limit(limit);

  res.json({ tasks, total, page, totalPages: Math.ceil(total / limit) });
});

// Task Details
router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Update Status
router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  task.status = status;
  await task.save();
  res.json(task);
});

module.exports = router;
