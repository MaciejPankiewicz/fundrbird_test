# fundrbird_test

# 🌾 Rolnopol – Automated Tests (Playwright)

App for tests: `https://github.com/jaktestowac/rolnopol.git`

## 📌 Overview

In this project, I try to demonstrate different approaches to exploring various subjects.

This project is an automated testing framework designed for API and UI testing using modern tooling.
It focuses on reliability, maintainability, and separation of environments (development vs test).

The framework supports:

- API testing
- UI testing (Playwright)
- Environment-based configuration
- Authentication flows
- Reusable page objects and helpers

## ⚙️ Technologies

- Playwright – end-to-end UI and API testing
- TypeScript – type safety and better maintainability
- Node.js – runtime environment
- dotenv – environment variable management
- Jest-style assertions (Playwright expect) – assertions

## 🏗️ Architectural Decisions

### Page Object Model (POM)

UI tests are structured using Page Object Model:

- pages/ contains reusable page classes
- test logic is separated from selectors

### Environment-based configuration

Environment-based configuration

The project uses .env files:

- .env.test – test environment
- .env.prod – prod environment
- process.env – runtime config

## 🚀 Requirements

Before getting started, make sure you have installed:

- Node.js (>= 18)
- npm (>= 8)
- Git

Check versions:

- `node -v`
- `npm -v`
- `git --version`

## 📥 Project Installation

`git clone https://github.com/MaciejPankiewicz/fundrbird_test.git`

## ▶️ How to Run Tests

### 🔹 All tests

`npx playwright test`  
 or  
`npm run test`

### 🔹 All tests (headed mode – with visible browser)

`npx playwright test --headed`  
 or  
`npm run test:headed`  
 or  
`npm run test:1worker` -all tests on 1 worker("serial tests")

### 🔹 UI mode (interactive)

`npx playwright test --ui`

### 🔹 Run a specific test

`npx playwright test tests/test_name.spec.ts`

### 🔹 Run from github actions

- tests can be launched manually from github actions -> workflows

## 📁 Project Structure

```
project-root/
│
├── tests/ # Test files (UI + API)
│   ├── login.spec.ts
│   ├── api.spec.ts
│   └── register.spec.ts
│
├── pages/ # Page Object Models
│   ├── general.page.ts
│   ├── login.page.ts
│   └── register.page.ts
│
├── test-data/ # Test data
│   ├── messages.data.ts
│   ├── users.data.ts
│   └── misc.data.ts
│
├── playwright.config.ts # Playwright configuration
├── .env.test # Test environment variables
├── .env.prod # Prod environment variables
├── package.json
└── README.md
```
