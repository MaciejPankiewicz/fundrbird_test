import { test, expect } from '@playwright/test';
import { defaultUser2, updatedUser } from '../test-data/users.data.ts';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { accountMessages } from '../test-data/messages.data.ts';
import { GeneralPage } from '../pages/general.page.ts';

test.describe('Profile tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Update profile information and validate changes', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const generalPage = new GeneralPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.signInLink.click();
    await loginPage.loginUser(defaultUser2.email, defaultUser2.password);
    await loginPage.checkLoggedInUser(defaultUser2.email, defaultUser2.name);
    await profilePage.editProfile(updatedUser.name, updatedUser.email);
    await page.waitForLoadState('networkidle');
    await expect(generalPage.toastMessage).toHaveText(
      accountMessages.profileUpdateSuccess,
    );
    await generalPage.logoutButton.click();
    await loginPage.loginUser(updatedUser.email, updatedUser.password);
    await loginPage.checkLoggedInUser(updatedUser.email, updatedUser.name);
    await profilePage.editProfile(defaultUser2.name, defaultUser2.email);
    await page.waitForLoadState('networkidle');
    await expect(generalPage.toastMessage).toHaveText(
      accountMessages.profileUpdateSuccess,
    );

    await generalPage.logoutButton.click();
  });
});
