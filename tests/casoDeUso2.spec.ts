import { test, expect } from '@playwright/test';
import { closePage } from '../utils/teardownUtils';
import { MainPage } from '../pages/mainPage/mainPage';
import { mainPageData } from '../testData.json';

test('Filtrar Microondas y elegir el mas barato', async ({ page }) => {
  // Declarar las variables Page Object
  const mainPage = new MainPage(page);
  const pageTitle = mainPageData.mainPageTitle;

  // Abrir la página de Fravega
  await mainPage.launchSite();

  // Verificar que el titulo de la tab sea el esperado
  expect (await mainPage.getPageTitle()).toBe(pageTitle);

  // Ordenar los microondas por mas barato
  await mainPage.sortMicroWaves();

  // Comprar el Microondas mas barato
  await mainPage.buyCheapestMicroWaveItem();

});

test('Filtrar Microondas y elegir el mas barato (Escenario Negativo - Producto No encontrado)', async ({ page }) => {
  // Declarar las variables Page Object
  const mainPage = new MainPage(page);
  const pageTitle = mainPageData.mainPageTitle;

  // Abrir la página de Fravega
  await mainPage.launchSite();

  // Verificar que el titulo de la tab sea el esperado
  expect (await mainPage.getPageTitle()).toBe(pageTitle);

  // Buscar un Microondas Inexistente
  await mainPage.microWaveNotFound();

});

test.afterEach(async ({ page }, testInfo) => {
  await closePage(page, testInfo);
});