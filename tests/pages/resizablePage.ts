import { type Locator, type Page } from '@playwright/test';

export class ResizablePage {
	readonly page: Page;
	readonly resizableBoxWithRestriction: Locator;
	readonly resizableHandle: Locator;
	readonly descriptivText: Locator;

	constructor(page: Page) {
		this.page = page;
		this.resizableBoxWithRestriction = page.locator('#resizableBoxWithRestriction');
		this.resizableHandle = page.locator('#resizableBoxWithRestriction .react-resizable-handle-se');
		this.descriptivText = page.locator('#resizableBoxWithRestriction .text').first();
	}
	//metodo de navegacion
	async goto() {
		await this.page.goto('https://demoqa.com/resizable');
		await this.page.waitForSelector('#resizableBoxWithRestriction'); 
	}

	async getResizableBoxWithRestrictionElement() {
		return this.resizableBoxWithRestriction;
	}
	//metodo para obetener el tamaño del contenedor
	async getResizableBoxSize() {
		await this.resizableBoxWithRestriction.waitFor({ state: 'visible' });
		const size = await this.resizableBoxWithRestriction.boundingBox();
		if (size) 
			return size;
		else 
			throw new Error('Bounding box size is null'); //agregamos un erro descriptivo si falla si el valor es nulo
        
	}
	//metodo para aumentar el contenedor
	async resizeResizableBox(targetWidth: number, targetHeight: number) {
		const currentSize = await this.getResizableBoxSize();
		const handleBox = await this.resizableHandle.boundingBox();

		if (!handleBox) 
			throw new Error('Bounding box of the handle is null');

		const widthOffset = targetWidth - currentSize.width;
		const heightOffset = targetHeight - currentSize.height;
		//simulamos el arrstre del mouse
		await this.page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
		await this.page.mouse.down();
		await this.page.mouse.move(handleBox.x + handleBox.width / 2 + widthOffset, handleBox.y + handleBox.height / 2 + heightOffset);
		await this.page.mouse.up();
	}
   
	async isTextoVisible() {
		try {
			// Usamos un selector más específico
			const texto = await this.page.locator('#resizableBoxWithRestriction .text').first();
			return await texto.isVisible();
		} catch (error) {
			console.error('Error al verificar la visibilidad del texto descriptivo:', error);
			return false;
		}
	}
    
}
