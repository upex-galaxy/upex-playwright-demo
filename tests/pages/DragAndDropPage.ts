import type { Page, Locator } from '@playwright/test';
import { getRandomCoordinates } from '@helper/utils/RandomCoordinates';

// Clase DragAndDrop
export class DragAndDrop {
	readonly page: Page;
	readonly simpleTab: Locator;
	readonly axisRestrictedTab: Locator;
	readonly containerRestrictedTab: Locator;
	readonly dragMeElement: Locator;
	readonly onlyXElement: Locator;
	readonly onlyYElement: Locator;
	readonly containedBox: Locator;
	readonly containedWithinParentBox: Locator;

	constructor(page: Page) {
		this.page = page;
		this.simpleTab = page.locator('#draggableExample-tab-simple');
		this.axisRestrictedTab = page.locator('#draggableExample-tab-axisRestriction');
		this.containerRestrictedTab = page.locator('#draggableExample-tab-containerRestriction');
		this.dragMeElement = page.locator('#dragBox');
		this.onlyXElement = page.locator('#restrictedX');
		this.onlyYElement = page.locator('#restrictedY');
		this.containedBox = page.locator('#containmentWrapper');
		this.containedWithinParentBox = page.locator('#draggableExample-tabpane-containerRestriction > div.draggable.ui-widget-content.m-3 > span');
	}

	async clickSimpleTab() {
		await this.simpleTab.click();
	}

	async clickAxisRestrictedTab() {
		await this.axisRestrictedTab.click();
	}

	async clickContainerRestrictedTab() {
		await this.containerRestrictedTab.click();
	}

	async dragSimpleElement() {
		const { x, y } = getRandomCoordinates(50, 200, 50, 200);
		await this.dragMeElement.dispatchEvent('mousedown', { button: 0 });
		await this.page.mouse.move(x, y);
		await this.page.mouse.up();
	}

	async dragElementInXAxis() {
		const { x } = getRandomCoordinates(50, 200, 0, 0);
		await this.onlyXElement.dispatchEvent('mousedown', { button: 0 });
		await this.page.mouse.move(x, 0);
		await this.page.mouse.up();
	}

	async dragElementInYAxis() {
		await this.onlyYElement.dispatchEvent('mousedown', { button: 0 });
		await this.page.mouse.move(0, 100);
		await this.page.mouse.up();
	}

	async dragContainedBox() {
		await this.containedBox.dispatchEvent('mousedown', { button: 0 });
		await this.page.mouse.move(100, 100);
		await this.page.mouse.up();
	}

	async dragContainedWithinParentBox() {
		await this.containedWithinParentBox.dispatchEvent('mousedown', { button: 0 });
		await this.page.mouse.move(100, 100);
		await this.page.mouse.up();
	}
}
