import { expect } from '@playwright/test'
import { test as base } from '@playwright/test'

// Define a new fixture
export const test = base.extend({
  // Extend the `page` fixture to include login logic
  page: async ({ page }, use) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await page
      .locator('div')
      .filter({ hasText: /^Email address$/ })
      .nth(1)
      .click()
    await page.getByLabel('Email address').fill('test+clerk_test@test.com')
    await page.getByLabel('Password', { exact: true }).fill('BHBH678yrhu43')
    await page.getByText('Continue', { exact: true }).click()

    await expect(
        page.getByRole("heading", { name: "Shop by Category" })
      ).toBeVisible();

      await page.goto('/products')

    // Now use the page in the test with the user logged in
    await use(page)
  }
})
