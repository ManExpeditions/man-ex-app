import supertest from 'supertest';
import mongoose from 'mongoose';
import config from '../../env';
import app from '../../app';
import connect from '../../lib/mongoose';
import experienceDao from '../../dao/experiences/experienceDao';

// Wrap express app for testing
const request = supertest(app);

describe('Test experiences get endpoint', () => {
  const endpoint = config.test.experience.base_endpoint;

  const experience_id = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    // Connect to test database
    const dbName = 'experiences-get';
    connect(config.test.base_db_path + dbName);
    await experienceDao.createNewExperience(experience_id);
  });

  it('should get all experiences', async () => {
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);

    // Get all experiences from database
    const experiences = await experienceDao.getExperiences({});
    // This should equal to number of experiences in response
    expect(response.body).toHaveSize(
      experiences?.length ? experiences.length : 0
    );
  });

  it('should throw error if isActive query param is not boolean', async () => {
    const response = await request.get(endpoint + '?isActive=notboolean');
    expect(response.status).toBe(404);
  });

  it('should get all active experiences', async () => {
    const response = await request.get(endpoint + '?isActive=true');
    expect(response.status).toBe(200);

    // Get all experiences from database
    const experiences = await experienceDao.getExperiences({ isActive: true });
    // This should equal to number of experiences in response
    expect(response.body).toHaveSize(
      experiences?.length ? experiences.length : 0
    );
  });

  it('should get all featured experiences', async () => {
    const response = await request.get(endpoint + '?isFeatured=true');
    expect(response.status).toBe(200);

    // Get all experiences from database
    const experiences = await experienceDao.getExperiences({
      isFeatured: true
    });
    // This should equal to number of experiences in response
    expect(response.body).toHaveSize(
      experiences?.length ? experiences.length : 0
    );
  });

  it('should throw error if isActive query param is not boolean', async () => {
    const response = await request.get(endpoint + '?isActive=notboolean');
    expect(response.status).toBe(404);
  });

  it('should throw error if isFeatured query param is not boolean', async () => {
    const response = await request.get(endpoint + '?isFeatured=notboolean');
    expect(response.status).toBe(404);
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
