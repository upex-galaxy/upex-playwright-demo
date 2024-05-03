import { test } from '@TestBase';
import { Page,expect } from '@playwright/test';
import { HomeFunctions, DesktopFunctions, DownloadsFunctions, DocumentsFunctions } from '@pages/bustosGX3-3300';

let homeFunctions: HomeFunctions;
let desktopFunctions: DesktopFunctions;
let downloadsFunctions: DownloadsFunctions;
let documentsFunctions: DocumentsFunctions;

test.describe('GX3-3300 Tools qa elements checkbox', async () => {
	test.beforeEach(async ( { page } ) => {
		await page.goto('https://demoqa.com/checkbox', { waitUntil: 'domcontentloaded' });
		homeFunctions = new HomeFunctions(page);
		desktopFunctions= new DesktopFunctions(page);
		downloadsFunctions= new DownloadsFunctions(page);
		documentsFunctions= new DocumentsFunctions(page);
	});

	test('TC1: Validate expand all toggles', async ({ page }) => {
		const checkedHome= page.getByRole('button',{ name:'Toggle' }).nth(0);
		await homeFunctions.clickExpandAll();
		await expect(checkedHome).toBeEnabled();

	});

	test('TC2: Validate collapse all toggles',async ({ page }) => {
		const checkedHome= page.getByRole('button',{ name:'Toggle' }).nth(0);
		await homeFunctions.clickExpandAll();
		await homeFunctions.clickCollapseAll();
		await expect(checkedHome).toBeEnabled();
	});

	test('TC3: Validate check all checkboxes',async ({ page }) => {
		const homeCheckbox = page.locator('label').filter({ hasText: 'Home' }).getByRole('img').first();
		await homeFunctions.selectCheckBoxHome();
		await homeFunctions.clickExpandAll();
		await expect(homeCheckbox).toBeChecked();
	});

	test('TC4: Validate uncheck all checkboxes',async ({ page }) => {
		const homeCheckbox = page.locator('label').filter({ hasText: 'Home' }).getByRole('img').first();
		await homeFunctions.selectCheckBoxHome();
		await homeFunctions.clickExpandAll();
		await homeFunctions.selectCheckBoxHome();
		await expect(homeCheckbox).not.toBeChecked();
	});
	
	test('TC5:Validate check on "Desktop" folder',async ({ page }) => {
		const checkDesktop= page.locator('label').filter({ hasText: 'Desktop' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await desktopFunctions.toggleDesktop();
		await desktopFunctions.checkDesktop();
		await expect (checkDesktop).toBeChecked();

	});

	test('TC6:Validate check a file inside "Desktop" folder', async ({ page }) => {
		const checkFile= page.locator('label').filter({ hasText: 'Desktop' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await desktopFunctions.selectRandomDesktop();
		await expect (checkFile).not.toBeChecked();
	});

	test('TC7: Validate check on "Documents" folder', async ({ page }) => {
		const documentsCheck= page.locator('label').filter({ hasText: 'Documents' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await documentsFunctions.checkDocuments();
		await expect(documentsCheck).toBeChecked();

	});

	test('TC8:Validate check a folder inside "Documents" folder', async ({ page }) => {
		const officeCheck= page.locator('label').filter({ hasText: 'Office' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await documentsFunctions.expandDocuments();
		await documentsFunctions.checkOffice();
		await expect(officeCheck).toBeChecked();
	});

	test('TC9: Validate check a file inside "Office" folder', async ({ page }) => {
		const fileCheck= page.locator('label').filter({ hasText: 'Office' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await documentsFunctions.expandDocuments();
		await documentsFunctions.selectRandomOffice();
		await expect(fileCheck).not.toBeChecked();
		
	});

	test('TC10: Validate check a file inside "Workspace" folder', async ({ page }) => {
		const fileCheck= page.locator('label').filter({ hasText: 'WorkSpace' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await documentsFunctions.expandDocuments();
		await documentsFunctions.selectRandomWorkSpace();
		await expect(fileCheck).not.toBeChecked();
	});

	test('TC11:Validate check on "Downloads" folder', async ({ page }) => {
		const downloadCheck= page.locator('label').filter({ hasText: 'Downloads' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await downloadsFunctions.checkDownloads();
		await expect(downloadCheck).toBeChecked();
	});

	test('TC12:Validate check a file inside "Downloads" folder', async ({ page }) => {
		const downloadCheck= page.locator('label').filter({ hasText: 'Downloads' }).getByRole('img').first();
		await homeFunctions.clickToggleHome();
		await downloadsFunctions.selectRandomDownloads();
		await expect(downloadCheck).not.toBeChecked();
	});
});