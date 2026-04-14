import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { authMessages, accountMessages } from '../test-data/messages.data.ts';
import { registerUser } from '../test-data/users.data.ts';
import { misc } from '../test-data/misc.data.ts';
import { GeneralPage } from '../pages/general.page';
import { RegisterPage } from '../pages/register.page';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Successful register and login with newly registered user and delete user after it', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const registerPage = new RegisterPage(page);
  const registerUserEmail = registerUser.email;
  const registerUserPassword = registerUser.password;
  const registerUserName = registerUser.name;
  const registrationSuccessMessage = authMessages.registrationSuccess;
  const deleteSuccessMessage = accountMessages.deleteUserSuccess;
  const deleteConfirmationValue = misc.deleteConfirmationValue;

  await registerPage.registerUser(
    registerUserEmail,
    registerUserName,
    registerUserPassword,
  );
  await expect(generalPage.toastMessage).toHaveText(registrationSuccessMessage);
  await loginPage.loginUser(registerUserEmail, registerUserPassword);
  await loginPage.checkLoggedInUser(registerUserEmail, registerUserName);
  await registerPage.deleteUser(deleteConfirmationValue);
  await expect(generalPage.toastMessage).toHaveText(deleteSuccessMessage);
});

test('Unsuccessful user register with already existing user login', async ({
  page,
}) => {
  const generalPage = new GeneralPage(page);
  const registerPage = new RegisterPage(page);
  const registerUserEmail = process.env.TEST_USER_EMAIL!;
  const registerUserPassword = process.env.TEST_USER_PASSWORD!;
  const registerUserName = process.env.TEST_USER_NAME!;
  const registrationUserExistMessage = authMessages.userAlreadyExists;

  await registerPage.registerUser(
    registerUserEmail,
    registerUserName,
    registerUserPassword,
  );
  await expect(generalPage.toastMessage).toHaveText(
    registrationUserExistMessage,
  );
});
