import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import { testAuthorization } from '../commonTests';
import { getUser } from '../testUtils';

// Wrap express app for testing
const request = supertest(app);

describe('Test user verification code endpoint', () => {
  const { user_id, user_email, user_pass_encrypted, user_phone, user_token } =
    getUser();

  const endpoint = config.test.user.base_endpoint + `${user_id}/verify/code`;

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-verification-code';
    connect(config.test.base_db_path + dbName);

    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // User must be authorized for this endpoint
  testAuthorization(request, 'post', endpoint, {});

  it('should throw error if type is not provided', async () => {
    const response = await request
      .post(endpoint)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ phone: user_phone });
    expect(response.status).toBe(404);
  });

  it('should throw error if type is email but email not in body', async () => {
    const response = await request
      .post(endpoint + '?type=email')
      .set('Authorization', `Bearer ${user_token}`)
      .send({ phone: user_phone });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid Request: Enter a valid email in body.'
    });
  });

  it('should throw error if type is phone but phone not in body', async () => {
    const response = await request
      .post(endpoint + '?type=phone')
      .set('Authorization', `Bearer ${user_token}`)
      .send({ email: user_email });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid Request: Enter a valid phone number in body.'
    });
  });

  afterAll(async () => {
    // Clean up database after each test
    await userDao.deleteAllUsers();
    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
