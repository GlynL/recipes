import { Ingredient, Recipe } from "@/app/models";
import { test, expect } from "@playwright/test";
import { sql } from "@vercel/postgres";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Recipes/);
});

test("navigation", async ({ page }) => {
  await page.getByTestId("nav-new-link").click();
  await expect(page).toHaveURL("/add_recipe");
  await page.getByTestId("nav-home-link").click();
  await expect(page).toHaveURL("/");
});

test("recipe link", async ({ page }) => {
  await page.getByRole("link", { name: "holy grail" }).click();
  await expect(page.getByRole("heading", { name: "holy grail" })).toBeVisible();
});

test("deletion", async ({ page }) => {
  const recipeData: Recipe = {
    id: crypto.randomUUID(),
    title: "pigeon pie",
  };
  await sql`
      INSERT INTO recipes (id, title)
      VALUES (${recipeData.id}, ${recipeData.title});
  `;
  await page.reload();
  await expect(page.getByRole("link", { name: "pigeon pie" })).toBeVisible();
  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("link", { name: "pigeon pie" }) })
    .getByRole("button")
    .click();
  await expect(
    page.getByRole("link", { name: "pigeon pie" }),
  ).not.toBeVisible();
});
