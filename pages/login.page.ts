import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  headerEmailDisplay: Locator;
  headerNameDisplay: Locator;
  bodyEmailDisplay: Locator;
  bodyNameDisplay: Locator;
  signInLink: Locator;
  loginFormDisplay: Locator;
  homePageHeaderDisplay: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('email-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-submit-btn');
    this.headerEmailDisplay = this.page.locator('#profileEmail');
    this.headerNameDisplay = this.page.locator('#profileName');
    this.bodyEmailDisplay = this.page.getByTestId('email-value');
    this.bodyNameDisplay = this.page.getByTestId('displayed-name');
    this.signInLink = this.page.getByRole('link', { name: ' Sign In' });
    this.loginFormDisplay = this.page.locator('#loginForm');
    this.homePageHeaderDisplay = this.page
      .locator('#home-legacy-header')
      .getByText('Rolnopol');
  }

  async loginUser(email: string, password: string) {
    await expect(this.loginFormDisplay).toBeVisible();
    await this.loginInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async checkLoggedInUser(email: string, name: string) {
    await expect(this.headerEmailDisplay).toHaveText(email);
    await expect(this.headerNameDisplay).toHaveText(name);
    await expect(this.bodyEmailDisplay).toHaveText(email);
    await expect(this.bodyNameDisplay).toHaveText(name);
  }
}
