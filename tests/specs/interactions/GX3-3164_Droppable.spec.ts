import { AcceptDrop, ChangeTab } from '@pages/bustosGX3-3164';
import { SimpleDrop, PreventDrop,RevertDrop } from '@pages/bustosGX3-3164';

import { test, expect } from '@TestBase';

let changeTab: ChangeTab;
let simpleDrop: SimpleDrop;
let acceptDrop: AcceptDrop;
let preventDrop: PreventDrop;
let revertDrop: RevertDrop;

test.describe('GX3-3164 interactions-droppable', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://demoqa.com/droppable',{ waitUntil: 'domcontentloaded' });
		simpleDrop = new SimpleDrop(page);
		changeTab= new ChangeTab(page);
		acceptDrop= new AcceptDrop(page);
		preventDrop= new PreventDrop(page);
		revertDrop= new RevertDrop(page);
	});
	
	test('TC1: Validate the simple item to be dropped on the Simple tab',async ({ page }) => {
		await simpleDrop.dragSimple();
		const droppable = page.locator('#droppable').nth(0);

		await expect(droppable).toHaveText('Dropped!');
	});

	test('TC2: Validate the "accept" item to be dropped on the "Accept" tab of the Simple tab. ',async ( { page } ) => {
		const droppable = page.locator('#droppable').nth(1);
		
		await test.step('click on accept page', async () => {
			await changeTab.acceptTabPage();
		});
		
		await test.step('drop acceptable Item', async () => {
			await acceptDrop.acceptableDrag();
			await expect(droppable).toHaveText('Dropped!');
		});

	});

	test('TC3: Validate the "not accept item" to not be dropped on the "Accept" droppable of the Simple tab.', async ({ page }) => {				
		const droppable = page.locator('#droppable').nth(0);
		
		await test.step('click on accept page', async () => {
			await changeTab.acceptTabPage();
		});

		await test.step('drop not acceptable Item', async () => {		
			await acceptDrop.notAcceptableDrag();
			await expect(droppable).toHaveText('Drop here');
		});
		
	});

	test('TC4: Validate the item to be dropped on the "Outer not greedy" droppable of the Prevent Propogation tab.', async ({ page }) => {
		const outDroppable = page.locator('#notGreedyDropBox');
		//const innerDroppable = page.locator('#notGreedyInnerDropBox');
		
		await test.step('click on Prevent Propogation page', async () => {
			await changeTab.preventTabPage();
		});

		await test.step('drop item', async () => {
			await preventDrop.dragIntoOuterDroppable1();
			await expect(outDroppable).toContainText('Dropped!');
			
		});
		
	});

	test('TC5: Validate the item to be dropped on the "Inner not greedy" droppable of the Prevent Propogation tab.', async ({ page }) => {
		const innerDroppable = page.locator('#notGreedyInnerDropBox');
		
		await test.step('click on Prevent Propogation page', async () => {
			await changeTab.preventTabPage();
		});

		await test.step('drop item', async () => {
			await preventDrop.dragIntoInnerNotGreedy();
			await expect(innerDroppable).toHaveText('Dropped!');
		});
		
	});

	test('TC6: Validate the item to be dropped on the "Outer greedy" droppable of the Prevent Propogation tab.',async ({ page }) => {
		const outerDroppable = page.locator('#greedyDropBox');
		
		await test.step('click on Prevent Propogation page', async () => {
			await changeTab.preventTabPage();
		});

		await test.step('drop item', async () => {
			await preventDrop.dragIntoOuterDroppable2();
			await expect(outerDroppable).toContainText('Dropped!');
		});
		
	});

	test('TC7: Validate the item to be dropped on the "Inner greedy" droppable of the Prevent Propogation tab.', async ({ page }) => {
		const innerDroppable = page.locator('#greedyDropBoxInner');
		
		await test.step('click on prevent propogation page', async () => {
			await changeTab.preventTabPage();
		});
		await test.step('drop item', async () => {
			await preventDrop.dragIntoInnerGreedy();
			await expect (innerDroppable).toHaveText('Dropped!');
		});
		
	});

	test('TC8: Validate the "Not revert" item to be dropped on the drop of the Revert Draggable tab. ', async ({ page }) => {
		const droppable = page.getByLabel('Revert Draggable').locator('#droppable');

		await test.step('click on revert draggable page', async () => {
			await changeTab.revertTabPage();
		});
		await test.step('drop item', async () => {
			await revertDrop.itemDropNotRevert();
			await expect(droppable).toHaveText('Dropped!');
		});
		
	});

	test('TC9: Validate the "Will revert" item to be dropped on the drop of the Revert Draggable tab.', async ({ page }) => {
		const droppable = page.getByLabel('Revert Draggable').locator('#droppable');
		await test.step('click on revert draggable page', async () => {
			await changeTab.revertTabPage();
		});

		await test.step('drop item', async () => {
			await revertDrop.itemDropRevert();
			await expect(droppable).toHaveText('Dropped!');
		});
		
	});

	test('TC10: Validate the "accept" item to be hover on the "Accept" tab of the Simple tab.', async ({ page }) => {
		const droppable = page.locator('#droppable').nth(1);

		await test.step('click on accept page', async () => {
			await changeTab.acceptTabPage();
		});
		
		await test.step('hover item', async () => {
			await acceptDrop.hoverItem();
			await expect(droppable).toHaveClass(/active/);
		});

	});

	test('TC11: Validate the item to be hover on the "Outer not greedy" droppable of the Prevent Propogation tab.',async ({ page }) => {
		const outDroppable = page.locator('#notGreedyDropBox');
		await test.step('click on Prevent Propogation page', async () => {
			await changeTab.preventTabPage();
		});

		await test.step('hover item', async () => {
			await preventDrop.hoverOuterBox();
			await expect(outDroppable).toHaveClass('drop-box-outer mt-4 ui-droppable ui-droppable-active ui-active ui-droppable-hover ui-hover');
		});
		
	});

	test('TC12: Validate the item to be hover on the "Inner not greedy" droppable of the Prevent Propogation tab.', async ({ page }) => {
		const innerDroppable = page.locator('#notGreedyInnerDropBox');
		await test.step('click on Prevent Propogation page', async () => {
			await changeTab.preventTabPage();
		});

		await test.step('hover item', async () => {
			await preventDrop.hoverInnerBox();
			await expect(innerDroppable).toHaveClass('drop-box ui-droppable ui-droppable-active ui-active ui-droppable-hover ui-hover');
		});
		
	});

	test('TC13: Validate the "Will revert" item to be hover on the drop of the Revert Draggable tab.', async ({ page }) => {
		const droppable = page.getByLabel('Revert Draggable').locator('#droppable');

		await test.step('click on revert draggable page', async () => {
			await changeTab.revertTabPage();
		});

		await test.step('hover item', async () => {
			await revertDrop.hoverRevertItem();
			await expect(droppable).toHaveClass(/active/);
		});
		
	});
});