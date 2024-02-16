import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("register page", async ({ page }) => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const email = faker.internet.email();

  await page.goto("http://localhost:3000/register");

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("confirm-password").fill(password);

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("login")).toBeVisible();
});
