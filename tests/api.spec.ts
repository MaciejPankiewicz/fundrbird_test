import { test, expect, request } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.only('API test with authentication and user actions', async ({
  request,
}) => {
  const loginResponse = await request.post(
    'http://localhost:3000/api/v1/login',
    {
      data: {
        email: loginData.defaultUserEmail,
        password: loginData.defaultUserPassword,
      },
    },
  );

  expect(loginResponse.ok()).toBeTruthy();

  const loginDataResponse = await loginResponse.json();
  console.log('Login Response:', loginDataResponse.message);
});
