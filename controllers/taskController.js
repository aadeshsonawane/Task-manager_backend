const taskModel = require('../models/taskModel');


const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = { getTasks, createTask, updateTask, deleteTask, toggleStatus };