# fundrbird_test

# 🌾 Rolnopol – Automatyczne testy(Playwright)

## 🚀 Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:

- Node.js (>= 18)
- npm (>= 8)
- Git

Sprawdzenie wersji:

- node -v
- npm -v
- git --version

## 📥 Instalacja projektu

git clone https://github.com/jaktestowac/rolnopol

## ▶️ Uruchamianie testów

### 🔹 Wszystkie testy

npx playwright test

### 🔹 Wszystkie testy headless(z widocznym przebiegiem)

npx playwright test --headed

### 🔹 Tryb UI (interaktywny)

npx playwright test --ui

### 🔹 Uruchomienie konkretnego testu

npx playwright test tests/nazwa_testu.spec.ts
