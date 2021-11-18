import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connect from '../../../lib/mongoose';
import User from '../../../models/user';

// Wrap express app for testing
const request = supertest(app);

describe('Test registration via email', () => {
  const endpoint = '/api/auth/v1/register/email';

  beforeAll(async () => {
    // Connect to test database
    connect('mongodb://localhost:27017/email-registration');
  });

  it('should create user in database', async () => {
    const response = await request
      .post(endpoint)
      .send({ email: 'john@example.com', password: 'CyKHe3kR@' });
    expect(response.status).toBe(200);

    // Check the data in the database
    const user = await User.findById(response.body.id);
    expect(user).toBeTruthy();
    expect(user?.email).toBe(response.body.email);
  });

  it('should throw error on existing email', async () => {
    const response = await request
      .post(endpoint)
      .send({ email: 'john@example.com', password: 'CyKHe3kR@' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User already exists. Please login.'
    });
  });

  it('should throw error on invalid email', async () => {
    const response = await request
      .post(endpoint)
      .send({ name: 'chicken', password: 'CyKHe3kR@' });
    expect(response.status).toBe(404);
  });

  it('should throw error on weak password', async () => {
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
