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

export const testParamObjectDoesNotExist = (
  request: SupertestIndex,
  requestType: string,
  requestEndpoint: string,
  requestBody: object,
  objectName: string
) => {
  it(`should throw error if ${objectName} id does not exist`, async () => {
    const response = await request[requestType as any](requestEndpoint).send(
      requestBody
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `${objectName} does not exist.`
    });
  });
};
