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

describe('Test user delete endpoint', () => {
  const endpoint = config.test.user.base_endpoint;

  const { user_id, user_email, user_pass_encrypted, user_token } = getUser();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-delete';
    connect(config.test.base_db_path + dbName);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // User must be authorized for this endpoint
  testAuthorization(request, 'delete', endpoint + user_id, {
    email: user_email
  });

  it('should throw error if body is empty', async () => {
    const response = await request
      .put(endpoint + user_id)
      .set('Authorization', `Bearer ${user_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Request body is empty.'
    });
  });

  it('should throw error if user id does not exist', async () => {
    const response = await request
      .delete(endpoint + '619fa6092269ffea182c1b6a')
      .set('Authorization', `Bearer ${user_token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist.'
    });
  });

  it('should delete the user', async () => {
    const response = await request
      .delete(endpoint + user_id)
      .set('Authorization', `Bearer ${user_token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'User deleted.'
    });

    // check if user deleted in database
    expect(await userDao.findUserById(user_id)).toBeNull();
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
