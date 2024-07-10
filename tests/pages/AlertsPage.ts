import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class AlertPage { //Declaramos la Clase y las variables privadas que identifican los elementos
	private readonly page: Page;
	private readonly alertButton: Locator;
	private readonly timerButton: Locator;
	private readonly confirmButton: Locator;
	private readonly promptButton: Locator;
	private readonly confirmResultText: Locator;
	private readonly promptResultText: Locator;

	constructor(page: Page) { // inicializamos la pagina y los selectores 
		this.page = page;

		this.alertButton = this.page.locator('#alertButton');
		this.timerButton = this.page.locator('#timerAlertButton');
		this.confirmButton = this.page.locator('#confirmButton');
		this.promptButton = this.page.locator('#promtButton'); // Corregir el selector aquí
		this.confirmResultText = this.page.locator('#confirmResult');
		this.promptResultText = this.page.locator('#promptResult');
	}

	async navigateToAlertsPage() { // hacemos los metodos de accion y navegacion
		await this.page.goto('https://demoqa.com/alerts');
		await expect(this.page).toHaveTitle(/DEMOQA/);
	}

	async clickAlertButton() {
		await this.alertButton.click();
	}

	async clickTimerButton() {
		await this.timerButton.click();
	}

	async clickConfirmButton() {
		await this.confirmButton.click();
	}

	async clickPromptButton() {
		await this.promptButton.waitFor({ state: 'visible', timeout: 5000 });
		await this.promptButton.click();
	}

	async handleAlert(action: 'accept' | 'dismiss', inputText?: string): Promise<string> { // metodo para manejar las alertas
		return new Promise<string>((resolve) => {
			this.page.once('dialog', async (dialog) => {
				const message = dialog.message();
				if (action === 'accept')
					await dialog.accept(inputText);
				else
					await dialog.dismiss();

				resolve(message);
			});
		});
	}

	async getConfirmResultText(): Promise<string> { // metodos para obtener los resultados
		await this.confirmResultText.waitFor({ state: 'visible', timeout: 10000 });
		const text = await this.confirmResultText.textContent();
		return text || '';
	}

	async getPromptResultText(): Promise<string> {
		try {
			await this.promptResultText.waitFor({ state: 'visible', timeout: 10000 });
		} catch (error) { // Aquí faltaba el paréntesis de cierre después de 'error'
			console.error('Error waiting for prompt result text:', error);
			return '';
		}
    
		const text = await this.promptResultText.textContent();
		return text || '';
	}
}
