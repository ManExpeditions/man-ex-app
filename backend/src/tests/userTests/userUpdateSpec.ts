import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import generateToken from '../../lib/jwt';

// Wrap express app for testing
const request = supertest(app);

describe('Test user update endpoint', () => {
  const endpoint = '/api/user/v1/';

  const user_id = mongoose.Types.ObjectId();
  const user_email = 'john@example.com';
  const user_pass = 'CyKHe3kR';
  const user_token = generateToken({ _id: user_id, email: user_email });

  beforeAll(async () => {
    // Connect to test database
    connect('mongodb://localhost:27017/user-update');
    await userDao.create_new_user_by_email(user_email, user_pass, user_id);
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
      .put(endpoint + '619fa6092269ffea182c1b6a')
      .set('Authorization', `Bearer ${user_token}`)
      .send({ firstName: 'John' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist.'
    });
  });

  it('should update user firstname', async () => {
    const response = await request
      .put(endpoint + user_id)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ firstName: 'John' });
    expect(response.status).toBe(200);

    const updatedUser = await userDao.find_user_by_id(user_id);
    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.firstName).toBe(response.body.firstName);
  });

  afterAll(async () => {
    // Clean up database after each test
    await userDao.delete_all_users();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
