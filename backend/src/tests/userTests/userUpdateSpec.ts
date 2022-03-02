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

describe('Test user update endpoint', () => {
  const endpoint = config.test.user.base_endpoint;

  const { user_id, user_email, user_pass_encrypted, user_token } = getUser();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'user-update';
    connect(config.test.base_db_path + dbName);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // User must be authorized for this endpoint
  testAuthorization(request, 'put', endpoint + user_id, { email: user_email });

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

  describe('Test user fields', async () => {
    const fields = [
      { isActive: false },
      { firstName: 'John' },
      { lastName: 'Sommers' },
      { email: 'johnsommers@example.com' },
      { phone: '+16289462243' },
      { emailVerified: true },
      { phoneVerified: false },
      { gender: 'Male' },
      { language: 'English' },
      { interests: ['Arts & Culture', 'Cruises', 'Camping'] },
      { continents: ['Africa', 'Europe'] },
      { city: 'San Francisco' },
      { state: 'California' },
      { country: 'USA' },
      { profilepic: 'link to an image' },
      { profilepicVerified: true },
      { verificationProfilePic: 'link to an image' },
      {
        bio:
          'Lorem ipsum dolor sit amet, consectetur adipiscing' +
          'elit, sed do eiusmod tempor incididunt ut labore et' +
          'dolore magna aliqua. Ut enim ad minim veniam, quis' +
          'nostrud exercitation ullamco laboris nisi ut aliquip' +
          'ex ea commodo consequat. Duis aute irure dolor in' +
          'reprehenderit in voluptate velit esse'
      },
      {
        socials: {
          instagram: 'ajaydipsingh',
          facebook: 'ajaydipsingh',
          linkedin: 'ajaydipsingh'
        }
      },
      { authType: 'email' },
      { completedOnboarding: true }
    ];

    fields.map((field) => {
      const fieldName = String(Object.keys(field));
      it(`should update ${fieldName} field`, async () => {
        const response = await request
          .put(endpoint + user_id)
          .set('Authorization', `Bearer ${user_token}`)
          .send(field);
        expect(response.status).toBe(200);

        const updatedUser = await userDao.findUserById(user_id);
        expect(updatedUser).toBeTruthy();
        if (updatedUser) {
          expect({ ...Object(updatedUser[fieldName as keyof User]) }).toEqual({
            ...Object(response.body[fieldName])
          });
        }
      });
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
