# Automation Exercise - Playwright Test Suite

End-to-end test suite for [automationexercise.com](https://automationexercise.com) built with Playwright and JavaScript.

## Project Structure

```
automation-exercise/
├── playwright.config.js          # Playwright configuration
├── fixtures/
│   └── base.fixture.js           # Custom fixtures (ad blocking, POMs, auth helpers)
├── pages/                        # Page Object Models
│   ├── home.page.js
│   ├── login-signup.page.js
│   ├── signup.page.js
│   ├── products.page.js
│   ├── product-detail.page.js
│   ├── cart.page.js
│   ├── checkout.page.js
│   ├── payment.page.js
│   ├── contact-us.page.js
│   ├── account-created.page.js
│   └── account-deleted.page.js
├── data/                         # Test data files
│   ├── user.data.js
│   ├── payment.data.js
│   └── test-upload.txt
└── tests/                        # Test specs (1 per test case)
    ├── test-case-01-register-user.spec.js
    ├── test-case-02-login-correct.spec.js
    ├── ...
    ├── test-case-26-scroll-up-without-arrow.spec.js
    ├── api/                      # API test specs
    └── nonfunctional/            # Non-functional tests
        ├── landing-page-a11y.spec.js
        ├── landing-page-performance.spec.js
        └── landing-page-lighthouse.spec.js
```

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test case
npx playwright test test-case-01

# Run with UI mode
npx playwright test --ui

# Run headed (visible browser)
npx playwright test --headed

# View last test report
npx playwright show-report
```

## Test Cases

All 26 test cases from [automationexercise.com/test_cases](https://automationexercise.com/test_cases) are implemented:

| # | Test Case |
|---|-----------|
| 1 | Register User |
| 2 | Login User with correct email and password |
| 3 | Login User with incorrect email and password |
| 4 | Logout User |
| 5 | Register User with existing email |
| 6 | Contact Us Form |
| 7 | Verify Test Cases Page |
| 8 | Verify All Products and product detail page |
| 9 | Search Product |
| 10 | Verify Subscription in home page |
| 11 | Verify Subscription in Cart page |
| 12 | Add Products in Cart |
| 13 | Verify Product quantity in Cart |
| 14 | Place Order: Register while Checkout |
| 15 | Place Order: Register before Checkout |
| 16 | Place Order: Login before Checkout |
| 17 | Remove Products From Cart |
| 18 | View Category Products |
| 19 | View & Cart Brand Products |
| 20 | Search Products and Verify Cart After Login |
| 21 | Add review on product |
| 22 | Add to cart from Recommended items |
| 23 | Verify address details in checkout page |
| 24 | Download Invoice after purchase order |
| 25 | Verify Scroll Up using 'Arrow' button and Scroll Down |
| 26 | Verify Scroll Up without 'Arrow' button and Scroll Down |

## API Tests

The `tests/api/` folder covers the [automationexercise.com REST APIs](https://automationexercise.com/api_list):

- `products-api.spec.js` — Products list and search
- `brands-api.spec.js` — Brands list
- `account-api.spec.js` — Account create/delete
- `verify-login-api.spec.js` — Login verification
- `search-api.spec.js` — Product search

```bash
npm run test:api
```

## Non-Functional Tests

The `tests/nonfunctional/` folder contains non-functional tests for the landing page using `@axe-core/playwright` and `playwright-lighthouse`.

- **`landing-page-a11y.spec.js`** — WCAG 2.1 AA accessibility (axe-core scans, keyboard nav, focus, page structure, responsive)
- **`landing-page-performance.spec.js`** — Page load timing, resource loading, DOM size, console errors
- **`landing-page-lighthouse.spec.js`** — Lighthouse audits (accessibility, performance, best practices, SEO)

```bash
# Run all non-functional tests
npm run test:nonfunctional

# Run by category
npm run test:a11y
npm run test:performance
npm run test:lighthouse
```

## Design Patterns

- **Page Object Model (POM)** - Each page has its own class encapsulating locators and actions
- **Custom Fixtures** - Reusable test setup via Playwright's fixture system
- **Data-Driven** - Test data extracted into separate files for maintainability
- **Ad Blocking** - Automatic route interception blocks ad domains that interfere with tests

## Tech Stack

- Playwright
- JavaScript (Node.js)
- Chromium (configurable in playwright.config.js)
- axe-core (accessibility testing)
- Lighthouse (performance & SEO auditing)
