import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

test('API test with authentication and user actions', async ({ request }) => {
  const loginResponse = await request.post(`${process.env.BASE_URL}/login`, {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  });

  const responseBody = await loginResponse.json();

  if (!loginResponse.ok()) {
    console.error('API ERROR:');
    console.error('Status:', loginResponse.status());
    console.error('Response:', responseBody);
  }

  console.log('Login success:', responseBody.message);

  expect(loginResponse.ok()).toBeTruthy();
});
