import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  registerLink: Locator;
  registerEmail: Locator;
  registerDisplayName: Locator;
  registerPassword: Locator;
  registerSubmitButton: Locator;
  deleteAccountButton: Locator;
  delteConfirmationInput: Locator;
  cancelDeleteButton: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
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
    await this.click(this.registerLink);
    await this.fill(this.registerEmail, email);
    await this.fill(this.registerDisplayName, name);
    await this.fill(this.registerPassword, password);
    await this.click(this.registerSubmitButton);
  }
  async deleteUser(confirmation: string) {
    await this.click(this.deleteAccountButton);
    await this.fill(this.delteConfirmationInput, confirmation);
    await this.click(this.cancelDeleteButton);
    await this.click(this.deleteAccountButton);
    await this.fill(this.delteConfirmationInput, confirmation);
    await this.click(this.confirmDeleteButton);
  }
}
