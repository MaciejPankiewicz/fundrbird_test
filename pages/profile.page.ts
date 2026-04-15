import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  editProfileButton: Locator;
  nameEditInput: Locator;
  mailEditInput: Locator;
  saveProfileButton: Locator;

  constructor(private page: Page) {
    this.nameEditInput = this.page.locator('#inlineDisplayedName');
    this.mailEditInput = this.page.locator('#inlineEmail');
    this.saveProfileButton = this.page.getByTestId('edit-profile-save');
    this.editProfileButton = this.page.locator('#editProfileInfoBtn');
  }

  async editProfile(name: string, email: string) {
    await this.editProfileButton.click();
    await this.nameEditInput.fill(name);
    await this.mailEditInput.fill(email);
    await this.saveProfileButton.click();
  }
}
