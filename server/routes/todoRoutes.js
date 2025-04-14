const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

router.post('/', async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
  });
  await newTodo.save();
  res.status(201).json(newTodo);
});

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Todo.findByIdAndDelete(id); 
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }
    res.status(200).json({ message: 'Task excluída com sucesso!' });
  } catch (error) {
    console.log("Deu erro no programa: " + error);
    res.status(500).json({ message: 'Erro ao excluir' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { $set: { done: req.body.done } },  
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Deu erro no programa: " + error);
    res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
  }
});

module.exports = router;
