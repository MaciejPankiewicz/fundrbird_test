import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { GeneralPage } from '../pages/general.page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Successful login with default user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const defaultUserEmail = loginData.defaultUserEmail;
  const defaultUserPassword = loginData.defaultUserPassword;
  const defaultUserName = loginData.defaultUserName;

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
  const defaultUserEmail = loginData.defaultUserEmail;
  const incorrectPassword = loginData.incorrectPassword;
  const invalidCredentials = loginData.invalidCredentials;

  await loginPage.signInLink.click();
  await loginPage.loginUser(defaultUserEmail, incorrectPassword);
  await expect(generalPage.toastMessage).toHaveText(invalidCredentials);
});
