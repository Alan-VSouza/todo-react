const request = require('supertest');
const app = require('../server');  
const mongoose = require('mongoose');

describe('Todo API', () => {
  let todoId;

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/todos')  
      .send({ task: 'Learn GitHub Actions' });
    
    expect(response.status).toBe(201);
    expect(response.body.task).toBe('Learn GitHub Actions');
    todoId = response.body._id;  
  });

  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos'); 
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete a todo', async () => {
    const response = await request(app)
      .delete(`/api/todos/${todoId}`);  
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task excluída com sucesso!');
  });

  it('should return 404 if todo is not found on delete', async () => {
    const response = await request(app)
      .delete('/api/todos/3647889');  

    expect(response.status).toBe(500);  
    expect(response.body.message).toBe('Erro ao excluir');
  });
});
