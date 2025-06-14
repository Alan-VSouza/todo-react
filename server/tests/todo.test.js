const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

// Mock apenas o método 'model' de mongoose
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'), // Importa a implementação original
  model: jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue([]), // Mock de find
    findByIdAndDelete: jest.fn().mockResolvedValue(null), // Mock de findByIdAndDelete
    findByIdAndUpdate: jest.fn().mockResolvedValue(null), // Mock de findByIdAndUpdate
  }),
}));

describe('Todo API', () => {
  let todoId;

  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0); // Expect empty array
  });

  it('should return 404 if todo is not found on delete', async () => {
    const response = await request(app).delete('/api/todos/3647889');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });

  it('should return 404 if todo is not found on update', async () => {
    const response = await request(app).patch('/api/todos/invalidid').send({ done: true });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task não encontrada');
  });
});
