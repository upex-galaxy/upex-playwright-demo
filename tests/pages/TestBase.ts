/* eslint-disable @typescript-eslint/naming-convention */
import { chromium, test as driver, type BrowserContext } from '@playwright/test';
import { SpaceLoginPage } from './SpaceLoginPage';
import { SpaceProductPage } from './SpaceProductPage';
import { SpaceCheckoutPage } from './SpaceCheckoutPage';
import { OrangeLoginPage } from './OrangeLoginPage';
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
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
		//? This is an example of how to use an extension in the browser context.
		const pathToExtension = path.join(rootDir, 'extension/adblock');
		fs.existsSync(pathToExtension) || console.error('❌ Extension not found');
		const chromeArgs = [
			`--disable-extensions-except=${pathToExtension}`,
			`--load-extension=${pathToExtension}`,	
		];
		if (process.env.CI) chromeArgs.push('--headless=new'); //? By default, Chrome's headless mode in Playwright does not support Chrome extensions. To overcome this limitation, you can run Chrome's persistent context with a new headless mode by using this code line.
		const context = await chromium.launchPersistentContext('', {
			headless: false, // required for extensions
			args: chromeArgs,
		});
		const extensionPage = await context.waitForEvent('page');
		await expect(extensionPage.locator('h1')).toContainText('AdBlock');
		console.log('✅ Extension loaded successfully');
		await extensionPage.close();
		await use(context);
		await context.close();
		//! NOTE: Using this TestBase in your Tests, you CANNOT run your tests in headless mode anymore, just on CI. 
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
