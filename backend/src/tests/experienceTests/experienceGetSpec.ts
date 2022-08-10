import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import { testParamObjectDoesNotExist } from '../commonTests';

// Wrap express app for testing
const request = supertest(app);

describe('Test experience get endpoint', () => {
  const endpoint = config.test.experience.base_endpoint;

  const experience_id = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'experience-get';
    connect(config.test.base_db_path + dbName);
    await experienceDao.createNewExperience(experience_id);
  });

  // Should throw error if experience does not exist
  testParamObjectDoesNotExist(
    request,
    'get',
    endpoint + '619fa6092269ffea182c1b6a',
    {},
    'Experience'
  );

  it('should throw error if experience id is not valid', async () => {
    const response = await request.get(endpoint + 'randominvalidid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Experience id is not valid.'
    });
  });

  it('should throw error if group id does not exist', async () => {
    const response = await request.get(endpoint + '619fa6092269ffea182c1b6a');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Experience does not exist.'
    });
  });

  it('should get experience', async () => {
    const response = await request.get(endpoint + experience_id);
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
