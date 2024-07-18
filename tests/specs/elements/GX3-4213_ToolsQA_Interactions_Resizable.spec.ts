import { story, precondition, expect } from '@pages/TestBase';
import { test } from '@playwright/test';
import { ResizablePage } from '@pages/resizablePage';

story('GX3-4213 | ToolsQA | Interactions | Resizable', () => {
	let resizablePage: ResizablePage;

	precondition(async ({ page }) => {//Se ejecuta nates de cada prueba
		resizablePage = new ResizablePage(page);
		await resizablePage.goto();//Navegamos a la pagina
	});

	test('4214 TC1 VALIDAR que el resizable box con restricción se muestra correctamente', async () => {
		const resizableBox = await resizablePage.getResizableBoxWithRestrictionElement();
    
		// El elemento del  DOM existe y es visible
		const isVisible = await resizableBox.isVisible();
		console.log(`Is the resizable box visible: ${isVisible}`);
		expect(isVisible).toBe(true);

		// se obtiene el tamaño del elemento
		const size = await resizablePage.getResizableBoxSize();
		console.log(`Size of the resizable box: width=${size.width}, height=${size.height}`);
    
		expect(size.width).toBeGreaterThan(0); //metodo para verificar el tamaño del elemento
		
	});

	test('4214 TC2 VALIDAR que el resizable box con restricción se puede redimensionar dentro de los límites', async () => {
		const resizableBox = await resizablePage.getResizableBoxWithRestrictionElement();//obtenemmos el elemento y verificamos que sea visible
		await expect(resizableBox).toBeVisible();

		const initialSize = await resizablePage.getResizableBoxSize();//obtenemos y registramos el tamaño inicial
		console.log(`Initial size: width=${initialSize.width}, height=${initialSize.height}`);

		// modificamos la caja a un tamaño dentro de los límites 
		await resizablePage.resizeResizableBox(300, 250);
		const newSize = await resizablePage.getResizableBoxSize();//obtenemos el nuevo tamaño
		console.log(`New size: width=${newSize.width}, height=${newSize.height}`);

		//observamos el nuevo tamaño con los valores permitidos
		expect(newSize.width).toBeGreaterThanOrEqual(150);
		expect(newSize.width).toBeLessThanOrEqual(500);
		expect(newSize.height).toBeGreaterThanOrEqual(150);
		expect(newSize.height).toBeLessThanOrEqual(300);
	});

	test('4214 TC3 VALIDAR que el texto descriptivo del resizable box con restricción es correcto', async () => {
		// Obtener y verificar el contenido del texto descriptivo
		const textoDescriptivo = await resizablePage.descriptivText.textContent();//verificamos que el texto sea visible
		expect(textoDescriptivo).toContain('Resizable');
    
	});
});
