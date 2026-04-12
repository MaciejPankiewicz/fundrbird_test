import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { GeneralPage } from '../pages/general.page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.only('Successful login with default user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const defaultUserEmail = loginData.defaultUserEmail;
  const defaultUserPassword = loginData.defaultUserPassword;
  const defaultUserName = loginData.defaultUserName;

  await expect(
    page.locator('#home-legacy-header').getByText('Rolnopol'),
  ).toBeVisible();
  await loginPage.login(defaultUserEmail, defaultUserPassword);
  await expect(loginPage.headerEmail).toHaveText(defaultUserEmail);
  await expect(loginPage.headerName).toHaveText(defaultUserName);
  await expect(loginPage.bodyName).toHaveText(defaultUserName);
  await expect(loginPage.bodyEmail).toHaveText(defaultUserEmail);
  await generalPage.logoutButton.click();
});

test.only('Unsuccessful login with default user with incorrect password', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const defaultUserEmail = loginData.defaultUserEmail;
  const incorrectPassword = loginData.incorrectPassword;
  const invalidCredentials = loginData.invalidCredentials;

  await loginPage.login(defaultUserEmail, incorrectPassword);
  await expect(generalPage.toastMessage).toHaveText(invalidCredentials);
});
