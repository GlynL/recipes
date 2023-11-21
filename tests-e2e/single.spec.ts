import { Ingredient, Recipe } from "@/app/models";
import { test, expect } from "@playwright/test";
import { sql } from "@vercel/postgres";
import { describe } from "node:test";

test.beforeEach(async ({ page }) => {
  await page.goto("/recipes/0b10aa7f-acc0-4aa8-82cc-ef9f13eb2483");
});

describe("detailed recipe page", () => {
  test(`heading`, async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "holy grail" }),
    ).toBeVisible();
  });

  test(`ingredients heading`, async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ingredients" }),
    ).toBeVisible();
  });

  test(`ingredients list`, async ({ page }) => {
    expect(await page.getByRole("listitem").allInnerTexts()).toContain("holy");
  });

  test(`method heading`, async ({ page }) => {
    await expect(page.getByRole("heading", { name: "method" })).toBeVisible();
  });

  test(`method list`, async ({ page }) => {
    expect(await page.getByRole("listitem").allInnerTexts()).toContain(
      "mix holy and grail",
    );
  });
  test(`navigate to edit`, async ({ page }) => {
    expect(await page.getByRole("link", { name: "edit" })).toBeVisible();
    await page.getByRole("link", { name: "edit" }).click();
    await expect(page).toHaveURL(
      `/recipes/0b10aa7f-acc0-4aa8-82cc-ef9f13eb2483/edit`,
    );
  });
});
