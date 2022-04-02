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

export const testAdminUser = (
  request: SupertestIndex,
  requestType: string,
  requestEndpoint: string,
  requestBody: object,
  token: string
) => {
  it('should throw error if not admin user', async () => {
    const response = await request[requestType as any](requestEndpoint)
      .set({ Authorization: `Bearer ${token}` })
      .send(requestBody);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Forbidden: You don't have permission."
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
