/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupertestIndex } from './testUtils';

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
