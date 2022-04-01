import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import { getUser } from '../testUtils';
import groupDao from '../../dao/groups/groupDao';
import experienceDao from '../../dao/experiences/experienceDao';
import { testParamObjectDoesNotExist } from '../commonTests';
import userDao from '../../dao/users/userDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test experience interested user put endpoint', () => {
  const endpoint = config.test.experience.base_endpoint;

  const { user_id, user_email, user_pass_encrypted } = getUser();
  const experience_id = mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'experience-interested-user';
    connect(config.test.base_db_path + dbName);
    await experienceDao.createNewExperience(experience_id);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // Should throw error if experience with id does not exist
  testParamObjectDoesNotExist(
    request,
    'put',
    endpoint + '619fa6092269ffea182c1b6a' + '/interested',
    { userId: user_id },
    'Experience'
  );

  it('should throw error if user id is not valid', async () => {
    const response = await request
      .put(endpoint + experience_id + '/interested')
      .send({ userId: 'randominvalidid' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User id is not valid.'
    });
  });

  it('should throw error if user id does not exist', async () => {
    const response = await request
      .put(endpoint + experience_id + '/interested')
      .send({ userId: '619fa6092269ffea182c1b6a' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist.'
    });
  });

  it('should add user to the list of interested users', async () => {
    const response = await request
      .put(endpoint + experience_id + '/interested')
      .send({ userId: user_id });
    expect(response.status).toBe(200);
    expect(response.body.interestedUsers).toBeInstanceOf(Array);

    // Check that the change was made to the database
    const experience = await experienceDao.findExperienceById(experience_id);
    expect(experience).toBeTruthy();
    expect(experience?.interestedUsers).toBeInstanceOf(Array);
    expect(response.body.interestedUsers.length).toEqual(
      experience?.interestedUsers.length
    );
  });

  it('should throw error if user already in the list of interested users', async () => {
    const response = await request
      .put(endpoint + experience_id + '/interested')
      .send({ userId: user_id });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User already exists in interested users list.'
    });
  });

  afterAll(async () => {
    // Clean up database after each test
    await experienceDao.deleteAllExperiences();
    await userDao.deleteAllUsers();

    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
