import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import { testAdminUser, testAuthorization } from '../commonTests';
import { getUser } from '../testUtils';
import userDao from '../../dao/users/userDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test experience create endpoint', () => {
  const endpoint = config.test.admin.base_endpoint;

  const { user_id, user_email, user_pass_encrypted, user_token } = getUser();
  const {
    user_id: admin_user_id,
    user_email: admin_user_email,
    user_pass_encrypted: admin_user_pass_encrypted,
    user_token: admin_user_token
  } = getUser(true);

  const experience_id = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'admin-experience-create';
    connect(config.test.base_db_path + dbName);
    await experienceDao.createNewExperience(experience_id);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
    await userDao.createNewUserByEmail(
      admin_user_email,
      admin_user_pass_encrypted,
      admin_user_id,
      true
    );
  });

  // Should throw error if user not authenticated
  testAuthorization(request, 'post', endpoint + 'experience', {});

  // Should throw error if user not admin
  testAdminUser(request, 'post', endpoint + 'experience', {}, user_token);

  it('should create a new experience', async () => {
    const response = await request
      .post(endpoint + 'experience')
      .set({ Authorization: `Bearer ${admin_user_token}` });
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    // Clean up database after each test
    await experienceDao.deleteAllExperiences();
    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
