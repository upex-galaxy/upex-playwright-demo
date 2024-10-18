import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class WebTablesPage {
	readonly page: Page;
	readonly openRegistrationFormButton: Locator;
	readonly submitRegistrationFormButton: Locator;
	readonly closeFormButton: Locator;
	readonly editRecordFormButton: Locator;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly emailInput: Locator;
	readonly ageInput: Locator;
	readonly salaryInput: Locator;
	readonly departmentInput: Locator;

	constructor(page: Page) {
		this.page = page;
		this.openRegistrationFormButton = page.locator('#addNewRecordButton');
		this.submitRegistrationFormButton = page.locator('#submit');
		this.closeFormButton = this.page.getByRole('button', { name: 'Close' });
		this.editRecordFormButton = page.locator('#edit-record-1 path');
		this.firstNameInput = page.locator('#firstName');
		this.lastNameInput = page.locator('#lastName');
		this.emailInput = page.locator('#userEmail');
		this.ageInput = page.locator('#age');
		this.salaryInput = page.locator('#salary');
		this.departmentInput = page.locator('#department');
	}

	async goto() {
		await this.page.goto('https://demoqa.com/webtables');
	}

	async clickOpenRegistrationFormButton() {
		await this.openRegistrationFormButton.click();
	}

	async clickCloseFormButton() {
		await this.closeFormButton.click();
	}

	async fillRegistrationForm(record: { firstName: string; lastName: string; email: string; age: string; salary: string; department: string }) {
		await this.firstNameInput.fill(record.firstName);
		await this.lastNameInput.fill(record.lastName);
		await this.emailInput.fill(record.email);
		await this.ageInput.fill(record.age);
		await this.salaryInput.fill(record.salary);
		await this.departmentInput.fill(record.department);
	}

	async clickSubmitRegistrationFormButton() {
		await this.submitRegistrationFormButton.click();
	}

	async clickEditButtonForRecord(rowNumber: number): Promise<void> {
		const editButtonSelector = `#edit-record-${rowNumber} path`;
		await this.page.locator(editButtonSelector).click();
	}

	async sortTableByColumnHeader(columnName: 'firstName' | 'lastName' | 'salary') {
		const headerSelectors = {
			firstName: this.page.locator('.rt-resizable-header-content').nth(0),
			lastName: this.page.locator('.rt-resizable-header-content').nth(1),
			salary: this.page.locator('.rt-resizable-header-content').nth(2)
		};
		const headerLocator = headerSelectors[columnName];
		await headerLocator.click();
	}

	async getAllColumnValues(columnName: 'firstName' | 'lastName' | 'salary') {
		const columnSelectors = {
			firstName: this.page.locator('.rt-tr-group .rt-td').nth(0),
			lastName: this.page.locator('.rt-tr-group .rt-td').nth(1),
			salary: this.page.locator('.rt-tr-group .rt-td').nth(4)
		};
		const columnLocator = columnSelectors[columnName];
		return await columnLocator.allTextContents();
	}

	async verifyColumnValuesAreSorted(columnValues: string[], isNumeric: boolean = false) {
		const sortedValues = [...columnValues].sort((a, b) => (isNumeric ? parseFloat(a) - parseFloat(b) : a.localeCompare(b)));
		expect(columnValues).toEqual(sortedValues);
	}

	async setRowsPerPageAndGetRowCount(value: string): Promise<number> {
		const rowsPerPageSelector = this.page.getByLabel('rows per page');
		await rowsPerPageSelector.selectOption({ value: value });
		await this.page.waitForTimeout(1000);
		const rowCountLocator = this.page.locator('.ReactTable .rt-tbody .rt-tr-group');
		return await rowCountLocator.count();
	}

	async clickNextButton() {
		const nextButtonLocator = this.page.getByRole('button', { name: 'Next' });
		await nextButtonLocator.click();
		await this.page.waitForTimeout(1000);
	}

	async clickPreviousButton() {
		const previousButtonLocator = this.page.getByRole('button', { name: 'Previous' });
		await previousButtonLocator.click();
		await this.page.waitForTimeout(1000);
	}

	async goToPageNumber(pageNumber: string) {
		const pageNumberInput = this.page.getByLabel('jump to page');
		await pageNumberInput.waitFor({ state: 'visible' });
		await pageNumberInput.fill(pageNumber);
		await pageNumberInput.press('Enter');
		await this.page.waitForTimeout(1000);
	}

	async addMultipleRecords(records: Array<{ firstName: string; lastName: string; email: string; age: string; salary: string; department: string }>) {
		for (const record of records) {
			await this.clickOpenRegistrationFormButton();
			await this.fillRegistrationForm(record);
			await this.clickSubmitRegistrationFormButton();
			await this.page.waitForTimeout(1000);
		}
	}

	async clickFirstNameHeader() {
		const firstNameHeaderLocator = this.page.locator('.rt-resizable-header-content').nth(0);
		await firstNameHeaderLocator.click();
	}

	async getNameFromFourthRowFirstColumn(): Promise<string> {
		const fourthRowFirstColumnLocator = this.page.locator('.rt-tbody .rt-tr-group').nth(3).locator('.rt-td').nth(0);
		const name = await fourthRowFirstColumnLocator.textContent();
		return name?.trim() || '';
	}

	async verifyNewRecordInForm(firstName: string) {
		const rows = this.page.locator('.rt-tr-group');
		const found = await rows.evaluateAll((rows: HTMLElement[], firstName: string) => rows.some(row => row.textContent?.includes(firstName)), firstName);
		expect(found).toBe(true);
	}

	async verifyRecordInTable(updatedFirstName: string) {
		const recordRow = this.page.locator(`table tbody tr:has(td:has-text("${updatedFirstName}"))`);
		await expect(recordRow).toBeVisible();
		await expect(recordRow).toContainText([updatedFirstName, 'UpdatedLastName', '35', 'updated.email@example.com', '55000', 'HR']);
	}

	async verifyRecordNotPresent(firstName: string) {
		const nameColumnLocator: Locator = this.page.locator('.rt-tr-group .rt-td').nth(0);
		const allNames = await nameColumnLocator.allTextContents();
		const isPresent = allNames.includes(firstName);
		expect(isPresent).toBeFalsy();
	}

	async verifyNamesAreSortedAlphabetically(names: string[]): Promise<boolean> {
		const sortedNames = [...names].sort();
		return JSON.stringify(names) === JSON.stringify(sortedNames);
	}

	async getNamesFromFirstColumn(): Promise<string[]> {
		const nameColumnLocator = this.page.locator('.rt-tr-group .rt-td').nth(0);
		const names = await nameColumnLocator.allTextContents();
		return names;
	}
}
