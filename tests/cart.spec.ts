import { expect } from '@playwright/test'
import { test } from './loginWithClerk'

test('add a subscription to the cart', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Subscription').check()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
})

test('add a single box to the cart', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
})

test('increase item quantity', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()

  await page.getByLabel('cart button').click()

  await expect(
    page.getByRole('heading', { name: 'Shopping cart' })
  ).toBeVisible()

  await page.getByLabel('Shopping cart').locator('img').nth(2).click()

  const quantityLocator = await page.locator('p#quantity').first().innerHTML()
  let totalQuantity = Number(quantityLocator)

  expect(totalQuantity).toBe(totalQuantity++)
})

test('decrease item quantity', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()

  await page.getByLabel('cart button').click()

  await expect(
    page.getByRole('heading', { name: 'Shopping cart' })
  ).toBeVisible()

  await page.getByLabel('Shopping cart').locator('img').nth(1).click()

  const quantityLocator = await page.locator('p#quantity').first().innerHTML()
  let totalQuantity = Number(quantityLocator)

  if (totalQuantity > 1) {
    expect(totalQuantity).toBe(totalQuantity--)
  }
})

test('remove an item if quantity is 0', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()

  await page.getByLabel('cart button').click()

  await expect(
    page.getByRole('heading', { name: 'Shopping cart' })
  ).toBeVisible()

  await page.getByLabel('Shopping cart').locator('img').nth(1).click()
})

test('remove an item from the cart', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await page.getByLabel('cart button').click()
  await page.getByRole('button', { name: 'Remove' }).click()
})

test('Start the checkout process', async ({ page }) => {
  await page.getByTestId('product').first().click()

  await page.getByLabel('Standard box (12oz)').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await page.getByLabel('cart button').click()

  await page.getByRole('button', { name: 'Checkout' }).click()
})
