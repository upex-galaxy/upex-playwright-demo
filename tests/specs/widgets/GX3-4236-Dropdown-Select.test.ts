import { test, expect, story, precondition } from '@TestBase';

story('GX3-4236: Widgets | Dropdown - Select Menu', () => {

	precondition(async ({ page }) => {
		await page.goto('/select-menu', { waitUntil: 'domcontentloaded' });
	});
	
	test('GX3-4237 | PW TC1: Should select value option from Select Value dropdown-type', async ({ page }) => {
		await page.pause();
		const element = page.locator('#withOptGroup');
		await element.click();

		// By Random Index:
		const options = page.locator('[id^=react-select][id*=option]');
		const allOptions = await options.all();
		const randomOption = Math.floor(Math.random() * allOptions.length);
		const selectedValue = await allOptions[randomOption].innerText();
		await allOptions[randomOption].click(); // selecting the Option.

		// Validation:
		await expect(element.locator('[class$=singleValue]')).toHaveText(selectedValue);

		//? By Text:
		// await element.click();
		// await options.getByText('Group 2, option 1', { exact: true }).click();
	});
});