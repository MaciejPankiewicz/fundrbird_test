import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  editProfileButton: Locator;
  nameEditInput: Locator;
  mailEditInput: Locator;
  saveProfileButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameEditInput = this.page.locator('#inlineDisplayedName');
    this.mailEditInput = this.page.locator('#inlineEmail');
    this.saveProfileButton = this.page.getByTestId('edit-profile-save');
    this.editProfileButton = this.page.locator('#editProfileInfoBtn');
  }

  async editProfile(name: string, email: string) {
    await this.click(this.editProfileButton);
    await this.fill(this.nameEditInput, name);
    await this.fill(this.mailEditInput, email);
    await this.click(this.saveProfileButton);
  }
}
