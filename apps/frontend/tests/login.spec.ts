import { test, expect } from "@playwright/test";

test("page has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Exercise Tracker/);
});

test("user can login", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("admin123");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("dashboard")).toBeVisible();
});

test("redirect to register page", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByTestId("register")).toBeVisible();
});
