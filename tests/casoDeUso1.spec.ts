import { test, expect } from '@playwright/test';
import { closePage } from '../utils/teardownUtils';
import { MainPage } from '../pages/mainPage/mainPage';
import { mainPageData } from '../testData.json';

test('Comprar Heladera Samsung', async ({ page }) => {
  // Declarar las variables Page Object
  const mainPage = new MainPage(page);
  const pageTitle = mainPageData.mainPageTitle;

  // Abrir la página de Fravega
  await mainPage.launchSite();

  // Verificar que el titulo de la tab sea el esperado
  expect (await mainPage.getPageTitle()).toBe(pageTitle);

  // Comprar la segunda Heladera Samsung
  await mainPage.buySecondFridge();

});

test.afterEach(async ({ page }, testInfo) => {
  await closePage(page, testInfo);
});