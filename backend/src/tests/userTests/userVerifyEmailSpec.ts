import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import generateToken from '../../lib/jwt';

// Wrap express app for testing
const request = supertest(app);

describe('Test user verify email endpoint', () => {
  const user_id = mongoose.Types.ObjectId();
  const user_email = 'john@example.com';
  const user_pass = 'CyKHe3kR';
  const user_token = generateToken({
    _id: user_id,
    email: user_email
  });

  const endpoint = `/api/user/v1/${user_id}/verify/email`;

  beforeAll(async () => {
    // Connect to test database
    connect('mongodb://localhost:27017/user-verify-email');
    await userDao.create_new_user_by_email(user_email, user_pass, user_id);
  });

  it('should throw error if no authorization header', async () => {
    const response = await request.put(endpoint);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid Request: Request missing Authorization header'
    });
  });

  afterAll(async () => {
    // Clean up database after each test
    await userDao.delete_all_users();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
