import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.beforeEach(async ({ page }) => {
  await page.goto("/recipes/0b10aa7f-acc0-4aa8-82cc-ef9f13eb2483/edit");
});

describe("detailed recipe page", () => {
  test(`heading`, async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "edit holy grail" }),
    ).toBeVisible();
  });
});
