import { story, precondition, test, expect } from '@pages/TestBase';
import { AlertPage } from '@pages/AlertsPage';

story('GX3-123 Test de Alertas y Diálogos', () => {
	let alertPage: AlertPage;

	precondition(async ({ page }) => {
		alertPage = new AlertPage(page);
		await alertPage.navigateToAlertsPage();
	});

	test('TC1 | Validar alerta inmediata al hacer clic en el primer botón', async () => {
		const alertPromise = alertPage.handleAlert('accept');
		await alertPage.clickAlertButton();
		const alertText = await alertPromise;
		expect(alertText).toEqual('You clicked a button');
	});

	test('TC2 | Validar alerta después de 5 segundos al hacer clic en el segundo botón', async () => {
		const alertPromise = alertPage.handleAlert('accept');
		await alertPage.clickTimerButton();
		const alertText = await alertPromise;
		expect(alertText).toEqual('This alert appeared after 5 seconds');
	});

	test('TC3 | Validar cuadro de confirmación al hacer clic en el tercer botón', async () => {
		const alertPromise = alertPage.handleAlert('accept');
		await alertPage.clickConfirmButton();
		const alertText = await alertPromise;
		expect(alertText).toEqual('Do you confirm action?');
	});

	test('TC4 | Validar confirmación al seleccionar OK en el cuadro de confirmación', async ({ page }) => {
		const alertPromise = alertPage.handleAlert('accept');
		await alertPage.clickConfirmButton();
		await alertPromise;
        
		await page.waitForTimeout(1000);
		const resultText = await alertPage.getConfirmResultText();
		expect(resultText).toContain('You selected Ok');
	});

	test('TC5 | Validar confirmación al seleccionar Cancel en el cuadro de confirmación', async ({ page }) => {
		const alertPromise = alertPage.handleAlert('dismiss');
		await alertPage.clickConfirmButton();
		await alertPromise;
        
		await page.waitForTimeout(1000);
		const resultText = await alertPage.getConfirmResultText();
		expect(resultText).toContain('You selected Cancel');
	});

	test('TC6 | Validar cuadro de mensaje emergente al hacer clic en el cuarto botón', async () => {
		const alertPromise = alertPage.handleAlert('accept');
		await alertPage.clickPromptButton();
		const alertText = await alertPromise;
		expect(alertText).toEqual('Please enter your name');
	});

	test('TC7 | Validar cierre de prompt con campo vacío y OK presionado', async ({ page }) => {
		const initialPromptText = ''; // Texto inicialmente vacío
		const alertPromise = alertPage.handleAlert('accept', initialPromptText);
		await alertPage.clickPromptButton();
		await alertPromise;
    
		await page.waitForTimeout(1000);

		const resultText = await alertPage.getPromptResultText();
		if (resultText.trim() !== '') 
			expect(resultText).toContain('You entered ');
		else 
		
			console.log('El campo de prompt está vacío.');
    
	});

	test('TC8 | Validar mensaje con texto ingresado y OK presionado', async ({ page }) => {
		const alertPromise = alertPage.handleAlert('accept', 'Gregorio');
		await alertPage.clickPromptButton();
		await alertPromise;
        
		await page.waitForTimeout(1000);
		const resultText = await alertPage.getPromptResultText();
		expect(resultText).toContain('You entered Gregorio');
	});

	test('TC9 | Validar cierre de prompt con Cancel presionado', async ({ page }) => {
		const initialPromptText = ''; 
		const alertPromise = alertPage.handleAlert('dismiss', initialPromptText); // Usamos 'dismiss' para Cancel
		await alertPage.clickPromptButton();
		await alertPromise;

		await page.waitForTimeout(1000);

		const resultText = await alertPage.getPromptResultText();

		if (resultText.trim() !== '') 
			expect(resultText).toContain('You entered null');
		else 
		
			console.log('El campo de prompt está vacío.');
    
	});

});