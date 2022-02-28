import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import connect from '../../lib/mongoose';
import userDao from '../../dao/users/userDao';
import generateToken from '../../lib/jwt';
import User from '../../models/user';

// Wrap express app for testing
const request = supertest(app);

describe('Test user update endpoint', () => {
  const endpoint = '/api/user/v1/';

  const user_id = mongoose.Types.ObjectId();
  const user_email = 'john@example.com';
  const user_pass = 'CyKHe3kR';
  const user_token = generateToken({ _id: user_id });

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

        const updatedUser = await userDao.find_user_by_id(user_id);
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
    await userDao.delete_all_users();
    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
