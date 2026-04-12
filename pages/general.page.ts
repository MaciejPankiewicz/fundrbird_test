import { Page, Locator } from '@playwright/test';

export class GeneralPage {
  logoutButton: Locator;
  toastMessage: Locator;

  constructor(private page: Page) {
    this.logoutButton = this.page
      .getByTestId('profile-header')
      .getByTestId('logout-btn');
    this.toastMessage = this.page.locator('.notification-message');
  }
}
