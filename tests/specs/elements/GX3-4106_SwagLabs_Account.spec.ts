import { story, precondition, expect } from '@pages/TestBase';
import { test } from '@playwright/test';
import { LoginPage } from '@pages/SwabLabsAccountPage';                          

story('Login tests', () => {
	let loginPage: LoginPage;

	precondition(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	test('GX3-4106 | TC1: Validar inicio de sesión exitoso', async () => {
		await loginPage.login('standard_user', 'secret_sauce');
		expect(await loginPage.isProductsTitleVisible()).toBeTruthy();
		expect(await loginPage.getProductsTitleText()).toBe('Products');
	});

	test('GX3-4106 | TC2: Validar inicio de sesión fallido con credenciales inválidas', async () => {
		await loginPage.login('invalid_user', 'invalid_password');
		expect(await loginPage.errorMessage.isVisible());
		expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Username and password do not match any user in this service');
	});

	test('GX3-4106 | TC3: Validar inicio de sesión fallido con campos vacíos', async ({ page }) => {
		await loginPage.login('', '');
		expect(await page.isVisible('[data-test="error"]')).toBeTruthy();
		expect(await loginPage.getErrorMessage()).toContain('Username is required');
	});

	test('GX3-4106 | TC4: Validar inicio de sesión con usuario bloqueado', async ({ page }) => {
		await loginPage.login('locked_out_user', 'secret_sauce');
		expect(await page.isVisible('[data-test="error"]')).toBeTruthy();
		expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
	});
});
