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

describe('Test user validate endpoint', () => {
  const { user_id, user_email, user_pass, user_pass_encrypted, user_token } =
    getUser();

  const endpoint = config.test.user.base_endpoint + `${user_id}/validate`;

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-validate';
    connect(config.test.base_db_path + dbName);

    await userDao.create_new_user_by_email(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // User must be authorized for this endpoint
  testAuthorization(request, 'post', endpoint, {
    password: '123432'
  });

  it('should throw error if incorrect password', async () => {
    const response = await request
      .post(endpoint)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ password: 'random_wrong_password' });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Incorrect password. Validation failed.'
    });
  });

  it('should succeed if password is correct', async () => {
    const response = await request
      .post(endpoint)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ password: user_pass });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'User validated.'
    });
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
