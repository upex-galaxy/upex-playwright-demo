import { expect } from '@playwright/test';
import { DragAndDrop } from '@pages/DragAndDropPage';
import { test, story, precondition } from '@TestBase';

story('Drag and Drop', () => {
	precondition(async ({ page }) => {
		await page.goto('https://demoqa.com/dragabble');
	});

	test('TC 1: Validar que la pestaña "Simple" se muestra por defecto al cargar la página', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await test.step('Verificar que la pestaña "Simple" es visible', async () => {
			await expect(dragAndDrop.simpleTab).toBeVisible();
		});

		await test.step('Verificar que la pestaña "Simple" está activa', async () => {
			await expect(dragAndDrop.simpleTab).toHaveClass(/nav-item nav-link active/);
		});
	});

	test('TC 2: Validar que solo una pestaña se muestra a la vez', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickSimpleTab();

		await test.step('Verificar que la pestaña "Axis Restricted" es visible', async () => {
			await expect(dragAndDrop.axisRestrictedTab).toBeVisible();
		});

		await test.step('Verificar que la pestaña "Axis Restricted" no está activa', async () => {
			await expect(dragAndDrop.axisRestrictedTab).not.toHaveClass(/nav-item nav-link active/);
		});
	});

	test('TC 3: Validar que el área "Drag me" en la pestaña "Simple" se puede arrastrar en cualquier dirección', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickSimpleTab();

		await test.step('Arrastrar el elemento "Drag me"', async () => {
			await dragAndDrop.dragSimpleElement();
		});

		await test.step('Verificar que el área "Drag me" sigue siendo visible después de arrastrar', async () => {
			await expect(dragAndDrop.dragMeElement).toBeVisible();
		});
	});

	test('TC 4: Validar que el área "Only X" en la pestaña "Axis Restricted" solo se puede arrastrar en el eje X', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickAxisRestrictedTab();

		await test.step('Arrastrar el elemento "Only X" en el eje X', async () => {
			await dragAndDrop.dragElementInXAxis();
		});

		await test.step('Verificar que el área "Only X" sigue siendo visible después de arrastrar', async () => {
			await expect(dragAndDrop.onlyXElement).toBeVisible();
		});
	});

	test('TC 5: Validar que el área "Only Y" en la pestaña "Axis Restricted" solo se puede arrastrar en el eje Y', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickAxisRestrictedTab();

		await test.step('Arrastrar el elemento "Only Y" en el eje Y', async () => {
			await dragAndDrop.dragElementInYAxis();
		});

		await test.step('Verificar que el área "Only Y" sigue siendo visible después de arrastrar', async () => {
			await expect(dragAndDrop.onlyYElement).toBeVisible();
		});
	});

	test('TC 6: Validar que el cuadro "Contained" no puede ser arrastrado fuera del contenedor', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickContainerRestrictedTab();

		await test.step('Arrastrar el cuadro "Contained"', async () => {
			await dragAndDrop.dragContainedBox();
		});

		await test.step('Verificar que el cuadro "Contained" sigue siendo visible dentro del contenedor', async () => {
			await expect(dragAndDrop.containedBox).toBeVisible();
		});
	});

	test('TC 7: Validar que el cuadro "Contained within parent" no puede ser arrastrado fuera del contenedor', async ({ page }) => {
		const dragAndDrop = new DragAndDrop(page);

		await dragAndDrop.clickContainerRestrictedTab();

		await test.step('Arrastrar el cuadro "Contained within parent"', async () => {
			await dragAndDrop.dragContainedWithinParentBox();
		});

		await test.step('Verificar que el cuadro "Contained within parent" sigue siendo visible dentro del contenedor', async () => {
			await expect(dragAndDrop.containedWithinParentBox).toBeVisible();
		});
	});
});
