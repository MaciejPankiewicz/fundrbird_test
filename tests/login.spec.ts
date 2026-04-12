import { test, expect } from '@playwright/test';

test('Successful login with default user', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('#home-legacy-header').getByText('Rolnopol'),
  ).toBeVisible();
  await page.getByRole('link', { name: ' Sign In' }).click();
  await page.getByTestId('email-input').fill('demo@example.com');
  await page.getByTestId('password-input').fill('demo123');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator('#profileEmail')).toHaveText('demo@example.com');
  await expect(page.locator('#profileName')).toHaveText('Demo User');
  await expect(page.getByTestId('displayed-name')).toHaveText('Demo User');
  await expect(page.getByTestId('email-value')).toHaveText('demo@example.com');
  await page.getByTestId('profile-header').getByTestId('logout-btn').click();
});

test.only('Unsuccessful login with default user with incorrect password', async ({
  page,
}) => {
  await page.goto('/login.html');
  await page.getByTestId('email-input').fill('demo@example.com');
  await page.getByTestId('password-input').fill('wrongpassword');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator('.notification-message')).toHaveText(
    'Invalid credentials',
  );
});
