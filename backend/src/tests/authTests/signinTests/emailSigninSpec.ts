import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connect from '../../../lib/mongoose';
import User from '../../../models/user';

// Wrap express app for testing
const request = supertest(app);

describe('Test signin via email', () => {
  const endpoint = '/api/auth/v1/signin/email';

  beforeAll(async () => {
    // Connect to test database
    connect('mongodb://localhost:27017/email-signin');

    // Create test user in database
    await request
      .post('/api/auth/v1/register/email')
      .send({ email: 'john@example.com', password: 'CyKHe3kR@' });
  });

  it('should sucessfully login', async () => {
    const response = await request
      .post(endpoint)
      .send({ email: 'john@example.com', password: 'CyKHe3kR@' });
    expect(response.status).toBe(200);
  });

  it('should throw error if user does not exist', async () => {
    const response = await request
      .post(endpoint)
      .send({ email: 'megan@example.com', password: 'CyKHe3kR@' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist. Please register.'
    });
  });

  it('should throw error on invalid email', async () => {
    const response = await request
      .post(endpoint)
      .send({ name: 'chicken', password: 'CyKHe3kR@' });
    expect(response.status).toBe(404);
  });

  it('should throw error if no password', async () => {
    const response = await request
      .post(endpoint)
      .send({ name: 'john@example.com', password: '' });
    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    // Clean up database after all tests
    await User.deleteMany();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
