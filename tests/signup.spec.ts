import { test, expect } from '@playwright/test'



test('Sign up', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.getByText('Sign up').click()
  await page
    .locator('div')
    .filter({ hasText: /^Email address$/ })
    .nth(1)
    .click()
  await page.getByLabel('Email address').fill('test+clerk_test@test.com')
  await page.getByLabel('Password', { exact: true }).fill('BHBH678yrhu43')
  await page.getByText('Continue', { exact: true }).click()
  await page.getByLabel('Enter verification code.').fill('424242')
})



