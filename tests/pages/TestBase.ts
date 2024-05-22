/* eslint-disable @typescript-eslint/naming-convention */
import { chromium, test as driver, type BrowserContext } from '@playwright/test';
import { SpaceLoginPage } from './SpaceLoginPage';
import { SpaceProductPage } from './SpaceProductPage';
import { SpaceCheckoutPage } from './SpaceCheckoutPage';
import { OrangeLoginPage } from './OrangeLoginPage';

import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../../');

const test = driver.extend<{
	context: BrowserContext;
	orangeLoginPage: OrangeLoginPage; //? Esto Page es para un ejemplo usando el superPrecondition.
	loginPage: SpaceLoginPage;
	productPage: SpaceProductPage;
	checkoutPage: SpaceCheckoutPage;
}>({
	// eslint-disable-next-line no-empty-pattern
	context: async ({ }, use) => {
		const pathToExtension = path.join(rootDir, 'extension/adblock');
		const context = await chromium.launchPersistentContext('', {
			headless: false,
			args: [
				`--disable-extensions-except=${pathToExtension}`,
				`--load-extension=${pathToExtension}`,	
			],
		});
		const extensionPage = await context.waitForEvent('page');
		await expect(extensionPage.locator('h1')).toHaveText('Thank you for installing AdBlock!');
		await extensionPage.close();
		await use(context);
		await context.close();
	},
	orangeLoginPage: async ({ page }, use) => await use(new OrangeLoginPage(page)),
	loginPage: async ({ page }, use) => await use(new SpaceLoginPage(page)),
	productPage: async ({ page }, use) => await use(new SpaceProductPage(page)),
	checkoutPage: async ({ page }, use) => await use(new SpaceCheckoutPage(page)),
});

export { test };
// Main utilities:
export const story = test.describe;
export const expect = test.expect;
// Hooks:
export const beforeAll = test.beforeAll;
export const precondition = test.beforeEach;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;
