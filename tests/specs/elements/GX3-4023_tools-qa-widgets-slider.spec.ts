import { story, precondition, test, expect } from '@TestBase';

story('GX3-4023 ⚡️ToolsQA | Widgets | Slider', () => {

	precondition(async ({ page }) => {
		await page.goto('https://demoqa.com/slider');
	});

	test('TC1: Validar que el control deslizante tiene un valor original de 25', async ({ page }) => {
		const sliderValue = await page.locator('#sliderValue').inputValue();
		expect(sliderValue).toBe('25');
	});

	test('TC2: Validar que el control deslizante tiene un rango de 0 a 100', async ({ page }) => {
		const slider = page.locator('input[type="range"]');
		const minValue = await slider.getAttribute('min');
		const maxValue = await slider.getAttribute('max');
		expect(minValue).toBe('0');
		expect(maxValue).toBe('100');
	});

	test('TC3: Validar que el valor de salida del control deslizante se actualiza correctamente al arrastrar el botón', async ({ page }) => {
		const slider = page.locator('input[type="range"]');

		// Movemos el slider a 0
		await slider.fill('0');
		await page.pause();
		let sliderValue = await page.locator('#sliderValue').inputValue();
		expect(sliderValue).toBe('0');

		// Movemos el slider a 50
		await slider.fill('50');
		await page.pause();
		sliderValue = await page.locator('#sliderValue').inputValue();
		expect(sliderValue).toBe('50');

		//Movemos el slider a 100
		await slider.fill('100');
		await page.pause();
		sliderValue = await page.locator('#sliderValue').inputValue();
		expect(sliderValue).toBe('100');
	});

});
