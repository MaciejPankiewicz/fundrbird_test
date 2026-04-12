import { test, expect } from '@playwright/test';

test('Successful register and login with newly registered user and delete user after it', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: ' Get Started Free' }).click();
  await page.getByTestId('email-input').fill('testrolo@rolnik.xd');
  await page.getByTestId('display-name-input').fill('Rolnik Jeden');
  await page.getByTestId('password-input').fill('rolnik123');
  await page.getByTestId('register-submit-btn').click();
  await expect(page.locator('.notification-message')).toHaveText(
    'Registration successful!',
  );
  await expect(page.locator('#loginForm')).toBeVisible();
  await page.getByTestId('email-input').fill('testrolo@rolnik.xd');
  await page.getByTestId('password-input').fill('rolnik123');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator('#profileEmail')).toHaveText('testrolo@rolnik.xd');
  await expect(page.locator('#profileName')).toHaveText('Rolnik Jeden');
  await expect(page.getByTestId('displayed-name')).toHaveText('Rolnik Jeden');
  await expect(page.getByTestId('email-value')).toHaveText(
    'testrolo@rolnik.xd',
  );
  await page.getByTestId('delete-account-btn').click();
  await page.getByTestId('delete-confirmation-input').fill('DELETE');
  await page.getByTestId('cancel-delete-btn').click();
  await expect(page.locator('#profileEmail')).toHaveText('testrolo@rolnik.xd');
  await page.getByTestId('delete-account-btn').click();
  await page.getByTestId('delete-confirmation-input').fill('DELETE');
  await page.getByTestId('confirm-delete-btn').click();
  await expect(page.locator('.notification-message')).toHaveText(
    'Account deleted successfully',
  );
});

test('Unsuccessful user register with already existing user login', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: ' Get Started Free' }).click();
  await page.getByTestId('email-input').fill('demo@example.com');
  await page.getByTestId('display-name-input').fill('Demo User');
  await page.getByTestId('password-input').fill('demo123');
  await page.getByTestId('register-submit-btn').click();
  await expect(page.locator('.notification-message')).toHaveText(
    'User with this email already exists',
  );
});
