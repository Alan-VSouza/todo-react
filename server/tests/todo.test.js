const request = require('supertest');
const app = require('../server');

describe('Todo API', () => {
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ task: 'Learn GitHub Actions' });
    expect(response.status).toBe(201);
    expect(response.body.task).toBe('Learn GitHub Actions');
  });
});