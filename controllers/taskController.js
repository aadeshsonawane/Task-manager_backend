const taskModel = require('../models/taskModel');


const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await taskModel.create({
      title,
      description,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { getTasks, createTask, updateTask, deleteTask, toggleStatus };