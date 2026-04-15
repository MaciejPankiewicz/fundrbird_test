import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class GeneralPage extends BasePage {
  logoutButton: Locator;
  toastMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = this.page
      .getByTestId('profile-header')
      .getByTestId('logout-btn');
    this.toastMessage = this.page.locator('.notification-message');
  }
}
