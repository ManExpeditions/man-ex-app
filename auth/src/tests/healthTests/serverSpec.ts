import supertest from 'supertest';
import app from '../../app';

// Wrap express app for testing
const request = supertest(app);

describe('Test base /api/auth/v1 endpoint', () => {
  it('should get status code 200 for visiting base endpoint', async () => {
    const response = await request.get('/api/auth/v1');
    expect(response.status).toBe(200);
  });
});
