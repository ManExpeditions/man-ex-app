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

describe('Test group get endpoint', () => {
  const endpoint = config.test.group.base_endpoint;

  const experience_id = mongoose.Types.ObjectId();
  const group_id = mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'group-get';
    connect(config.test.base_db_path + dbName);
    await createGroup(experience_id, group_id);
  });

  it('should throw error if group id is not valid', async () => {
    const response = await request.get(endpoint + 'randominvalidid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Group id is not valid.'
    });
  });

  it('should throw error if group id does not exist', async () => {
    const response = await request.get(endpoint + '619fa6092269ffea182c1b6a');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Group does not exist.'
    });
  });

  it('should get group', async () => {
    const response = await request.get(endpoint + group_id);
    expect(response.status).toBe(200);
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
