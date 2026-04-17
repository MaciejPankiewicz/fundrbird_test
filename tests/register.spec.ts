import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { authMessages, accountMessages } from '../test-data/messages.data.ts';
import { registerUser } from '../test-data/users.data.ts';
import { misc } from '../test-data/misc.data.ts';
import { GeneralPage } from '../pages/general.page';
import { RegisterPage } from '../pages/register.page';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

test.describe('Register user tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successful register and login with newly registered user and delete user after it', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const generalPage = new GeneralPage(page);
    const registerPage = new RegisterPage(page);
    const email = `user-${crypto.randomUUID()}@test.com`;

    await registerPage.registerUser(
      email,
      registerUser.name,
      registerUser.password,
    );
    await expect(generalPage.toastMessage).toHaveText(
      authMessages.registrationSuccess,
    );
    await loginPage.loginUser(email, registerUser.password);
    await loginPage.checkLoggedInUser(email, registerUser.name);
    await registerPage.deleteUser(misc.deleteConfirmationValue);
    await expect(generalPage.toastMessage).toHaveText(
      accountMessages.deleteUserSuccess,
    );
  });

  test('Unsuccessful user register with already existing user login', async ({
    page,
  }) => {
    const generalPage = new GeneralPage(page);
    const registerPage = new RegisterPage(page);
    const registerUserEmail = process.env.TEST_USER_EMAIL!;
    const registerUserPassword = process.env.TEST_USER_PASSWORD!;
    const registerUserName = process.env.TEST_USER_NAME!;

    await registerPage.registerUser(
      registerUserEmail,
      registerUserName,
      registerUserPassword,
    );
    await expect(generalPage.toastMessage).toHaveText(
      authMessages.userAlreadyExists,
    );
  });
});
