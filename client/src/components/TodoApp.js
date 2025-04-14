import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';  

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    axios
      .post('http://localhost:5000/api/todos', { task: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
  };

  const deleteTodo = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Essa tarefa será excluída permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4caf50', 
      cancelButtonColor: '#f44336',  
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/todos/${id}`)
          .then(() => {
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success('Tarefa excluída com sucesso!', {
              position: 'bottom-right',
              autoClose: 5000,
            });
          })
          .catch((error) => {
            console.error('Erro ao excluir tarefa:', error);
            toast.error('Erro ao excluir tarefa!', {
              position: 'bottom-right',
              autoClose: 5000,
            });
          });
      } else {
        toast.info('Exclusão cancelada', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    });
  };

  const completeTodo = (id, currentStatus) => {
    axios
      .patch(`http://localhost:5000/api/todos/${id}`, { done: !currentStatus })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((error) => console.error('Erro ao atualizar tarefa:', error));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.done ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => completeTodo(todo._id, todo.done)}
            />
            {todo.task}
            <button className="remove-todo" onClick={() => deleteTodo(todo._id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button className="add-todo" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TodoApp;
