import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
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

  constructor(page: Page) {
    super(page);
    this.loginInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-submit-btn');
    this.headerEmailDisplay = page.locator('#profileEmail');
    this.headerNameDisplay = page.locator('#profileName');
    this.bodyEmailDisplay = page.getByTestId('email-value');
    this.bodyNameDisplay = page.getByTestId('displayed-name');
    this.signInLink = page.getByRole('link', { name: ' Sign In' });
    this.loginFormDisplay = page.locator('#loginForm');
    this.homePageHeaderDisplay = page
      .locator('#home-legacy-header')
      .getByText('Rolnopol');
  }

  async loginUser(email: string, password: string) {
    await expect(this.loginFormDisplay).toBeVisible();
    await this.fill(this.loginInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async checkLoggedInUser(email: string, name: string) {
    await expect(this.headerEmailDisplay).toHaveText(email);
    await expect(this.headerNameDisplay).toHaveText(name);
    await expect(this.bodyEmailDisplay).toHaveText(email);
    await expect(this.bodyNameDisplay).toHaveText(name);
  }
}
