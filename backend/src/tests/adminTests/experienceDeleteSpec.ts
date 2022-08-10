import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import {
  testAdminUser,
  testAuthorization,
  testParamObjectDoesNotExist
} from '../commonTests';
import { getUser } from '../testUtils';
import userDao from '../../dao/users/userDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test experience delete endpoint', () => {
  const endpoint = config.test.admin.base_endpoint;

  const experience_id = new mongoose.Types.ObjectId();

  const { user_id, user_email, user_pass_encrypted, user_token } = getUser();
  const {
    user_id: admin_user_id,
    user_email: admin_user_email,
    user_pass_encrypted: admin_user_pass_encrypted,
    user_token: admin_user_token
  } = getUser(true);

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'admin-experience-delete';
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
  testAuthorization(
    request,
    'delete',
    endpoint + `experience/${experience_id}`,
    {}
  );

  // Should throw error if user not admin
  testAdminUser(
    request,
    'delete',
    endpoint + `experience/${experience_id}`,
    {},
    user_token
  );

  // Should throw error if experience does not exist
  testParamObjectDoesNotExist(
    request,
    'delete',
    endpoint + 'experience/619fa6092269ffea182c1b6a',
    {},
    'Experience',
    { Authorization: `Bearer ${admin_user_token}` }
  );

  it('should throw error if experience id is not valid', async () => {
    const response = await request
      .delete(endpoint + 'experience/randominvalidid')
      .set({ Authorization: `Bearer ${admin_user_token}` });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Experience id is not valid.'
    });
  });

  it('should delete experience', async () => {
    const response = await request
      .delete(endpoint + `experience/${experience_id}`)
      .set({ Authorization: `Bearer ${admin_user_token}` });
    expect(response.status).toBe(200);

    const deletedExperience = await experienceDao.findExperienceById(
      experience_id
    );
    expect(deletedExperience);
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
