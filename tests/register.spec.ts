import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { registerData } from '../test-data/register.data';
import { GeneralPage } from '../pages/general.page';
import { RegisterPage } from '../pages/register.page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Successful register and login with newly registered user and delete user after it', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const generalPage = new GeneralPage(page);
  const registerPage = new RegisterPage(page);
  const registerUserEmail = registerData.registerUserEmail;
  const registerUserPassword = registerData.registerUserPassword;
  const registerUserName = registerData.registerUserName;
  const registrationSuccessMessage =
    registerData.registrationUserSuccessMessage;
  const deleteSuccessMessage = registerData.deleteUserSuccessMessage;
  const deleteConfirmationValue = registerData.deleteConfirmationValue;

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
  const registerUserEmail = loginData.defaultUserEmail;
  const registerUserPassword = loginData.defaultUserPassword;
  const registerUserName = loginData.defaultUserName;
  const registrationUserExistMessage =
    registerData.registrationUserExistMessage;

  await registerPage.registerUser(
    registerUserEmail,
    registerUserName,
    registerUserPassword,
  );
  await expect(generalPage.toastMessage).toHaveText(
    registrationUserExistMessage,
  );
});
