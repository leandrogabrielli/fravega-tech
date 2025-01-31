import { Page, expect } from "@playwright/test";
import { getWebUrl } from "../../src/environmentUtils";
import { mainPageLocators } from "../../pageLocators/mainPageLocators";
import * as fixtureData from "../../testData.json";
import { detailsPageLocators } from "../../pageLocators/detailsPageLocators";
import { cartPageLocators } from "../../pageLocators/cartPageLocators";

const pageUrl = getWebUrl();

export class MainPage {
    page: Page;
  


    constructor(page: Page) {
      this.page = page;
    }
  
    async launchSite() {
      await this.page.goto(pageUrl);
      await this.page.locator(mainPageLocators.closeLandingModalButton).click();
    }

    async getPageTitle() {
      return await fixtureData.mainPageData.mainPageTitle;
    }
    
    async buySecondFridge() {
      await this.page.locator(mainPageLocators.searchInput).fill(fixtureData.mainPageData.searchedProductWithBrand);
      await this.page.locator(mainPageLocators.searchInput).press('Enter');
      await this.page.waitForTimeout(3000);
      const resultItems = await this.page.locator(mainPageLocators.allElementsInGrid);
      const count = await resultItems.count();
    if (count >= 2) {
      const secondItem = resultItems.nth(3);
      await secondItem.waitFor({ state: 'visible' });
      await secondItem.click();
      await this.page.locator(detailsPageLocators.addToCartButton).click();
      await this.page.waitForTimeout(5000);
      await this.page.locator(detailsPageLocators.confirmationModal).waitFor({ state: 'visible' });
      await this.page.locator(detailsPageLocators.cartButton).click();
      await this.page.locator(detailsPageLocators.cartProduct).waitFor({ state: 'visible' });
      await this.page.locator(detailsPageLocators.goToCartLink).click();
      await expect(this.page.locator(cartPageLocators.cartTitle)).toContainText(fixtureData.mainPageData.carritoTitle);
      await expect(this.page.locator(cartPageLocators.productTitleFridge)).toContainText(fixtureData.mainPageData.searchedProduct1);
      await this.page.waitForTimeout(5000);
    }
    }     
    
    async sortMicroWaves() {
      const {
        numberOfResults = 0
      } = fixtureData.mainPageData;
      await this.page.locator(mainPageLocators.searchInput).fill(fixtureData.mainPageData.searchedProduct1);
      await this.page.locator(mainPageLocators.searchInput).press('Enter');
      await this.page.waitForTimeout(3000);
      await this.page.locator(mainPageLocators.sortBy).click();
      await this.page.locator(mainPageLocators.lowPriceOption).click();
      await this.page.waitForTimeout(3000);

      const extractPrice = (priceText: string): number => {
        const match = priceText.match(/\$([\d.]+)/);
        return parseFloat(match?.[1] ?? "0");
      };
      
      const prices: number[] = [];
      for (let i = 0; i < numberOfResults; i++) {
        const extractedPriceText = await this.page.locator(mainPageLocators.allElementsInGrid).nth(i).innerText();
        prices.push(extractPrice(extractedPriceText));
      }
      
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
      
      
    }

    async buyCheapestMicroWaveItem() {
      const resultItems = await this.page.locator(mainPageLocators.allElementsInGrid);
      const count = await resultItems.count();
    if (count >= 2) {
      const firstItem = resultItems.nth(0);
      await firstItem.waitFor({ state: 'visible' });
      await firstItem.click();
      await this.page.locator(detailsPageLocators.addToCartButton).click();
      await this.page.waitForTimeout(5000);
      await this.page.locator(detailsPageLocators.confirmationModal).waitFor({ state: 'visible' });
      await this.page.locator(detailsPageLocators.cartButton).click();
      await this.page.locator(detailsPageLocators.cartProduct).waitFor({ state: 'visible' });
      await this.page.locator(detailsPageLocators.goToCartLink).click();
      await expect(this.page.locator(cartPageLocators.cartTitle)).toContainText(fixtureData.mainPageData.carritoTitle);
      await expect(this.page.locator(cartPageLocators.productTitleMicrowave)).toContainText(fixtureData.mainPageData.searchedProduct2);
    }
  }

  async microWaveNotFound() {
    await this.page.locator(mainPageLocators.searchInput).fill(fixtureData.mainPageData.searchedWrongProduct);
    await this.page.locator(mainPageLocators.searchInput).press('Enter');
    await this.page.locator(mainPageLocators.productNotFoundText).waitFor({ state: 'visible' });
    await this.page.waitForTimeout(5000);
  
  }      
}  