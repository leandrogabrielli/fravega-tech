import { Page, TestInfo } from "@playwright/test";

export async function closePage(page: Page, testInfo: TestInfo ) {
  await page.close();
}