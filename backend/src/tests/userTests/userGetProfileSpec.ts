import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import User from '../../models/user';
import { testAuthorization } from '../commonTests';
import { getUser } from '../testUtils';

// Wrap express app for testing
const request = supertest(app);

describe('Test user get profile endpoint', () => {
  const endpoint = config.test.user.base_endpoint;

  const { user_id, user_email, user_pass_encrypted, user_token } = getUser();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-get-profile';
    connect(config.test.base_db_path + dbName);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // User must be authorized for this endpoint
  const extendedEndpoint = endpoint + user_id + '/profile';
  testAuthorization(request, 'get', extendedEndpoint, {
    email: user_email
  });

  it('should throw error if user id does not exist', async () => {
    const response = await request
      .get(endpoint + '619fa6092269ffea182c1b6a' + '/profile')
      .set('Authorization', `Bearer ${user_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist.'
    });
  });

  it('should get user profile', async () => {
    const response = await request
      .get(extendedEndpoint)
      .set('Authorization', `Bearer ${user_token}`);
    expect(response.status).toBe(200);
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
