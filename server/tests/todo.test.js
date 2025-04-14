const request = require('supertest');
const app = require('../server');
const Todo = require('../models/Todo');

jest.mock('../models/Todo');

describe('Todo API', () => {
  let todoId;

  it('should get all todos', async () => {
    Todo.find.mockResolvedValue([]);
    
    const response = await request(app).get('/api/todos');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0); 
  });

  it('should return 404 if todo is not found on delete', async () => {
    Todo.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app).delete('/api/todos/3647889');
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });

  it('should return 404 if todo is not found on update', async () => {
    Todo.findByIdAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .patch('/api/todos/invalidid')
      .send({ done: true });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });
});
