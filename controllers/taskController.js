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
  const { title, description } = req.body;
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      { title, description },  // ← fakt he 2 update hote
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const toggleStatus = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    
    if(task.status === 'pending'){
      task.status = 'incomplete';
    } else if(task.status === 'incomplete'){
      task.status = 'completed';
    } else {
      task.status = 'pending';
    }
    
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, toggleStatus };