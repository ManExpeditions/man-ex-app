import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import generateToken from '../../lib/jwt';
import { testAuthorization } from '../commonTests';

// Wrap express app for testing
const request = supertest(app);

describe('Test user verify phone endpoint', () => {
  const user_id = mongoose.Types.ObjectId();
  const user_email = 'john@example.com';
  const user_phone = '+16289462243';
  const user_pass = 'CyKHe3kR';
  const user_token = generateToken({ _id: user_id });

  const endpoint = config.test.user.base_endpoint + `${user_id}/verify/phone`;

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-verify-email';
    connect(config.test.base_db_path + dbName);

    await userDao.create_new_user_by_email(user_email, user_pass, user_id);
  });

  // User must be authorized for this endpoint
  testAuthorization(request, 'post', endpoint, {
    verification_code: '123432',
    phone: user_phone
  });

  it('should throw error if no verification code', async () => {
    const response = await request
      .post(endpoint)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ phone: user_phone });
    expect(response.status).toBe(404);
  });

  it('should throw error if no phone', async () => {
    const response = await request
      .post(endpoint)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ verification_code: '123245' });
    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    // Clean up database after each test
    await userDao.delete_all_users();
    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
