import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/add_recipe');
});

test('heading', async ({page}) => {
  await expect(page.getByRole('heading', { name: 'Add New Recipe'})).toBeVisible()
})

test('add recipe', async ({page}) => {
  await page.getByLabel('title').fill('baby stew')
  await page.getByRole('button', { name: 'save'}).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', {name: 'baby stew'})).toBeVisible()
})

test('requires title', async ({page}) => {
  await expect(page.getByLabel('title')).toHaveAttribute('required')
  // await page.getByRole('button', { name: 'save'}).click()
  // await expect(page.getByTestId('message')).toHaveText('Database Error')
})

