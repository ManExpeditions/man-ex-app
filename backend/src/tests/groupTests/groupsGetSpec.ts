import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import { createGroup } from '../testUtils';
import groupDao from '../../dao/groups/groupDao';
import experienceDao from '../../dao/experiences/experienceDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test groups get endpoint', () => {
  const endpoint = config.test.group.base_endpoint;

  const experience_id = new mongoose.Types.ObjectId();
  const group_id = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'groups-get';
    connect(config.test.base_db_path + dbName);
    await createGroup(experience_id, group_id);
  });

  it('should get all groups', async () => {
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);

    // Get all groups from database
    const groups = await groupDao.getGroups();
    // This should equal to number of groups in response
    expect(response.body).toHaveSize(groups?.length ? groups.length : 0);
  });

  it('should throw error if experience id is not valid', async () => {
    const response = await request.get(endpoint + '?experienceId=notvalidid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Experience id is not valid'
    });
  });

  it('should throw error if experience does not exist', async () => {
    const response = await request.get(
      endpoint + '?experienceId=619fa6092269ffea182c1b6a'
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Experience does not exist.'
    });
  });

  it('should get all groups by experience id', async () => {
    const response = await request.get(
      endpoint + `?experienceId=${String(experience_id)}`
    );
    expect(response.status).toBe(200);

    // Get all groups from database
    const groups = await groupDao.getGroups(String(experience_id));
    // This should equal to number of groups in response
    expect(response.body).toHaveSize(groups?.length ? groups.length : 0);
  });

  afterAll(async () => {
    // Clean up database after each test
    await experienceDao.deleteAllExperiences();
    await groupDao.deleteGroupById(group_id);
    // Delete the current database
    await mongoose.connection.db.dropDatabase();
    // Close database connection after all tests
    await mongoose.connection.close();
  });
});
