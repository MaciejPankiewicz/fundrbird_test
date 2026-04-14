# fundrbird_test

# 🌾 Rolnopol – Automated Tests (Playwright)

## 🚀 Requirements

Before getting started, make sure you have installed:

- Node.js (>= 18)
- npm (>= 8)
- Git

Check versions:

- node -v
- npm -v
- git --version

## 📥 Project Installation

git clone https://github.com/MaciejPankiewicz/fundrbird_test.git

## ▶️ Running Tests

### 🔹 All tests

npx playwright test

### 🔹 All tests (headed mode – with visible browser)

npx playwright test --headed

### 🔹 UI mode (interactive)

npx playwright test --ui

### 🔹 Run a specific test

npx playwright test tests/test_name.spec.ts
