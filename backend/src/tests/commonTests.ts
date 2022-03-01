/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest';

// Create interface to be able to index superTest dynamically
interface SupertestIndex extends supertest.SuperTest<supertest.Test> {
  [key: string]: any;
}

export const testAuthorization = (
  request: SupertestIndex,
  requestType: string,
  requestEndpoint: string,
  requestBody: object
) => {
  it('should throw error if no authorization header', async () => {
    const response = await request[requestType as any](requestEndpoint).send(
      requestBody
    );
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid Request: Request missing Authorization header'
    });
  });
};
