import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import { createGroup, getUser } from '../testUtils';
import groupDao from '../../dao/groups/groupDao';
import experienceDao from '../../dao/experiences/experienceDao';
import { testParamObjectDoesNotExist } from '../commonTests';
import userDao from '../../dao/users/userDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test group interested user put endpoint', () => {
  const endpoint = config.test.group.base_endpoint;

  const { user_id, user_email, user_pass_encrypted } = getUser();
  const experience_id = new mongoose.Types.ObjectId();
  const group_id = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'group-interested-user';
    connect(config.test.base_db_path + dbName);
    await createGroup(experience_id, group_id);
    await userDao.createNewUserByEmail(
      user_email,
      user_pass_encrypted,
      user_id
    );
  });

  // Should throw error if group with id does not exist
  testParamObjectDoesNotExist(
    request,
    'put',
    endpoint + '619fa6092269ffea182c1b6a' + '/interested',
    { userId: user_id },
    'Group'
  );

  it('should throw error if user id is not valid', async () => {
    const response = await request
      .put(endpoint + group_id + '/interested')
      .send({ userId: 'randominvalidid' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User id is not valid.'
    });
  });

  it('should throw error if user id does not exist', async () => {
    const response = await request
      .put(endpoint + group_id + '/interested')
      .send({ userId: '619fa6092269ffea182c1b6a' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User does not exist.'
    });
  });

  it('should add user to the list of interested users', async () => {
    const response = await request
      .put(endpoint + group_id + '/interested')
      .send({ userId: user_id });
    expect(response.status).toBe(200);
    expect(response.body.interestedUsers).toBeInstanceOf(Array);
    expect(response.body.interestedUsers).toContain(String(user_id));

    // Check that the change was made to the database
    const group = await groupDao.findGroupById(group_id);
    expect(group).toBeTruthy();
    expect(group?.interestedUsers).toBeInstanceOf(Array);
    expect(group?.interestedUsers).toContain(user_id);
  });

  it('should throw error if user already in the list of interested users', async () => {
    const response = await request
      .put(endpoint + group_id + '/interested')
      .send({ userId: user_id });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User already exists in interested users list.'
    });
  });

  afterAll(async () => {
    // Clean up database after each test
    await experienceDao.deleteAllExperiences();
    await groupDao.deleteGroupById(group_id);
    await userDao.deleteAllUsers();

    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
