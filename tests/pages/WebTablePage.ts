import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class WebTablesPage {
	readonly page: Page;
	readonly addButton: Locator;
	readonly submitButton: Locator;
	readonly cancelButton: Locator;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly emailInput: Locator;
	readonly ageInput: Locator;
	readonly salaryInput: Locator;
	readonly departmentInput: Locator;

	// Incializacion de Selectores
	constructor(page: Page) {
		this.page = page;
		this.addButton = page.locator('#addNewRecordButton');
		this.submitButton = page.locator('#submit');
		this.cancelButton = this.page.locator('body > div.fade.modal.show > div > div > div.modal-header > button > span:nth-child(1)');
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

	async clickAddButton() {
		await this.addButton.click();
	}

	async clickCancelButton() {
		await this.cancelButton.click();
	}

	// Ingresar datos en el formulario
	async fillForm(record: { firstName: string; lastName: string; email: string; age: string; salary: string; department: string }) {
		await this.firstNameInput.fill(record.firstName);
		await this.lastNameInput.fill(record.lastName);
		await this.emailInput.fill(record.email);
		await this.ageInput.fill(record.age);
		await this.salaryInput.fill(record.salary);
		await this.departmentInput.fill(record.department);
	}

	async clickSubmitButton() {
		await this.submitButton.click();
	}

	// Verificar un nuevo registro en el formulario
	async verifyNewRecord(expectedName: string) {
		const cellSelector = '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody > div:nth-child(4) > div > div:nth-child(1)';
		const cell = this.page.locator(cellSelector);
		await expect(cell).toHaveText(expectedName);
	}

	// Verificar que un registro no esté presente en el formulario
	async verifyRecordNotPresent(expectedName: string) {
		const cellSelector = '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody';
		const rows = this.page.locator(cellSelector).locator('div.rt-tr');
		const texts = await rows.allInnerTexts();
		expect(texts).not.toContain(expectedName);
	}

	// Editar un registro específico
	async editRecord(rowNumber: number) {
		const editButtonLocator = this.page.locator(`#edit-record-${rowNumber} > svg > path`);
		await editButtonLocator.click();
	}

	// Ordenar la tabla por una columna
	async sortByColumn(columnName: 'firstName' | 'lastName' | 'salary') {
		const headerSelectors = {
			firstName: '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-thead > div.rt-tr > div:nth-child(1)',
			lastName: '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-thead > div.rt-tr > div:nth-child(2)',
			salary: '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-thead > div.rt-tr > div:nth-child(5)'
		};

		const headerLocator = this.page.locator(headerSelectors[columnName]);
		await headerLocator.click();
	}

	// Obtener los valores de una columna
	async getColumnValues(columnNumber: number) {
		const columnSelector = `#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody > div > div:nth-child(${columnNumber})`;
		const columnLocator = this.page.locator(columnSelector);
		return await columnLocator.allTextContents();
	}

	// Verificar que una columna esté ordenada
	async verifyColumnSorted(columnValues: string[], isNumeric: boolean = false) {
		const sortedValues = [...columnValues].sort((a, b) => (isNumeric ? parseFloat(a) - parseFloat(b) : a.localeCompare(b)));
		expect(columnValues).toEqual(sortedValues);
	}

	// Establecer el número de filas por página
	async setRowsPerPage(value: string) {
		const rowsPerPageSelector = this.page.locator('select[aria-label="rows per page"]');
		await rowsPerPageSelector.selectOption({ value: value });
		await this.page.waitForTimeout(1000);
	}

	// Obtener el conteo de filas visibles
	async getRowCount() {
		const rowCountLocator = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody > div');
		return await rowCountLocator.count();
	}

	async clickNextButton() {
		const nextButtonLocator = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.pagination-bottom > div > div.-next > button');
		await nextButtonLocator.click();
		await this.page.waitForTimeout(1000);
	}

	async clickPreviousButton() {
		const previousButtonLocator = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.pagination-bottom > div > div.-previous > button');
		await previousButtonLocator.click();
		await this.page.waitForTimeout(1000);
	}

	// paginacion
	async goToPage(pageNumber: string) {
		const pageNumberInput = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.pagination-bottom > div > div.-center > span.-pageInfo > div > input[type=number]');
		await pageNumberInput.waitFor({ state: 'visible' });
		await pageNumberInput.click();
		await pageNumberInput.fill(pageNumber);
		await pageNumberInput.press('Enter');
		await this.page.waitForTimeout(1000);
	}

	// Agregar registros en una iteración
	async addMultipleRecords(records: Array<{ firstName: string; lastName: string; email: string; age: string; salary: string; department: string }>) {
		for (const record of records) {
			await this.clickAddButton();
			await this.fillForm(record);
			await this.clickSubmitButton();
			await this.page.waitForTimeout(1000);
		}
	}

	// Hacer clic  columna "First Name"
	async clickFirstNameHeader() {
		const firstNameHeaderLocator = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-thead > div.rt-tr > div:nth-child(1)');
		await firstNameHeaderLocator.click();
	}

	// Obtén los nombres de la primera columna
	async getNamesFromFirstColumn(): Promise<string[]> {
		const nameColumnLocator = this.page.locator('#app > div > div > div > div.col-12.mt-4.col-md-6 > div.web-tables-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody > div > div:nth-child(1)');
		const names = await nameColumnLocator.allTextContents();
		return names;
	}

	// Verifica que los nombres están ordenados alfabéticamente
	async verifyNamesAreSortedAlphabetically(names: string[]): Promise<boolean> {
		const sortedNames = [...names].sort();
		return names.every((name, index) => name === sortedNames[index]);
	}
}
