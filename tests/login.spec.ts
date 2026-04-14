import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { GeneralPage } from '../pages/general.page';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Successful login with default user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const defaultUserEmail = process.env.TEST_USER_EMAIL!;
  const defaultUserPassword = process.env.TEST_USER_PASSWORD!;
  const defaultUserName = process.env.TEST_USER_NAME!;

  await expect(loginPage.homePageHeaderDisplay).toBeVisible();
  await loginPage.signInLink.click();
  await loginPage.loginUser(defaultUserEmail, defaultUserPassword);
  await loginPage.checkLoggedInUser(defaultUserEmail, defaultUserName);
  await generalPage.logoutButton.click();
});

test('Unsuccessful login with default user with incorrect password', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const defaultUserEmail = process.env.TEST_USER_EMAIL!;
  const incorrectPassword = loginData.incorrectPassword;
  const invalidCredentials = loginData.invalidCredentials;

  await loginPage.signInLink.click();
  await loginPage.loginUser(defaultUserEmail, incorrectPassword);
  await expect(generalPage.toastMessage).toHaveText(invalidCredentials);
});
