import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  registerLink: Locator;
  registerEmail: Locator;
  registerDisplayName: Locator;
  registerPassword: Locator;
  registerSubmitButton: Locator;
  deleteAccountButton: Locator;
  delteConfirmationInput: Locator;
  cancelDeleteButton: Locator;
  confirmDeleteButton: Locator;

  constructor(private page: Page) {
    this.registerLink = this.page.getByRole('link', {
      name: ' Get Started Free',
    });
    this.registerEmail = this.page.getByTestId('email-input');
    this.registerDisplayName = this.page.getByTestId('display-name-input');
    this.registerPassword = this.page.getByTestId('password-input');
    this.registerSubmitButton = this.page.getByTestId('register-submit-btn');
    this.deleteAccountButton = this.page.getByTestId('delete-account-btn');
    this.delteConfirmationInput = this.page.getByTestId(
      'delete-confirmation-input',
    );
    this.cancelDeleteButton = this.page.getByTestId('cancel-delete-btn');
    this.confirmDeleteButton = this.page.getByTestId('confirm-delete-btn');
  }

  async registerUser(email: string, name: string, password: string) {
    await this.registerLink.click();
    await this.registerEmail.fill(email);
    await this.registerDisplayName.fill(name);
    await this.registerPassword.fill(password);
    await this.registerSubmitButton.click();
  }
  async deleteUser(confirmation: string) {
    await this.deleteAccountButton.click();
    await this.delteConfirmationInput.fill(confirmation);
    await this.cancelDeleteButton.click();
    await this.deleteAccountButton.click();
    await this.delteConfirmationInput.fill(confirmation);
    await this.confirmDeleteButton.click();
  }
}
