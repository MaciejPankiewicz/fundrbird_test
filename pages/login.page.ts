import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  headerEmail: Locator;
  headerName: Locator;
  bodyEmail: Locator;
  bodyName: Locator;
  signInLink: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('email-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-submit-btn');
    this.headerEmail = this.page.locator('#profileEmail');
    this.headerName = this.page.locator('#profileName');
    this.bodyEmail = this.page.getByTestId('email-value');
    this.bodyName = this.page.getByTestId('displayed-name');
    this.signInLink = this.page.getByRole('link', { name: ' Sign In' });
  }

  async login(email: string, password: string) {
    await this.signInLink.click();
    await this.loginInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async checkLoggedInUser(email: string, name: string) {
    await expect(this.headerEmail).toHaveText(email);
    await expect(this.headerName).toHaveText(name);
    await expect(this.bodyEmail).toHaveText(email);
    await expect(this.bodyName).toHaveText(name);
  }
}
