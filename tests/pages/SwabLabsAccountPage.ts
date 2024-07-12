import { type Locator, type Page, } from '@playwright/test';

//Esta es la declaracion de la clase, lapagina y los elementos que la conforman
//llamando a su locator de cada uno
export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: Locator;
	readonly productsTitle: Locator;

	// inicializamos cada elemento con su locator que representa en el Doim
	constructor(page:Page) {
		this.page = page;
		this.usernameInput = page.locator('#user-name');
		this.passwordInput = page.locator('#password');
		this.loginButton = page.locator('#login-button');
		this.errorMessage = page.locator('[data-test="error"]');
		this.productsTitle = page.locator('[data-test="title"]');
	}

	// llamamos al metodo para navegar a la pagina principal
	async goto() {
		await this.page.goto('https://www.saucedemo.com');
	}

	//realizamos el metodo del login osea la accion 
	async login(username: string, password: string) {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
   
	}

	//Validamos con metodo la accion y resultado esperado
	async getErrorMessage() {
		return await this.errorMessage.textContent();
	}

	async getProductsTitleText() {
		return await this.productsTitle.textContent();
	}
  
	async isProductsTitleVisible() {
		return await this.productsTitle.isVisible();
	}
}
