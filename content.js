(async () => {
  try {
    // Step 1: Extract and store the name
    const nameElement = document.querySelector('div.font.bold.text-lg');
    if (!nameElement) throw new Error('Name element not found');
    const name = nameElement.textContent.trim();
    console.log('Stored name:', name);

    // Step 2: Click the Presets tab
    const presetsTab = document.querySelector('div.grow.text-center.cursor-pointer.p-3.text-orange-600.border-b-2.border-orange-600');
    if (!presetsTab) throw new Error('Presets tab not found');
    presetsTab.click();
    console.log('Clicked Presets tab');
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for UI update

    // Step 3: Click all 'make visible' buttons
    const visibleButtons = document.querySelectorAll('img[alt="make visible button"][src="/icons/eyeHidden.png"]');
    for (const button of visibleButtons) {
      button.closest('button').click();
      console.log('Clicked make visible button');
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 4: Select matching options in dropdowns
    const selectElements = document.querySelectorAll('select.text-orange-600.styled-scrollbar');
    if (selectElements.length === 0) throw new Error('No dropdowns found');
    for (const select of selectElements) {
      const options = select.querySelectorAll('option');
      let found = false;
      for (const option of options) {
        if (option.textContent.includes(name)) {
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          console.log(`Selected ${name} in dropdown`);
          found = true;
          break;
        }
      }
      if (!found) console.warn(`No matching option for ${name} in dropdown`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Step 5: Click all 'make invisible' buttons except for 'Single Chair'
    const items = document.querySelectorAll('div.font-medium.flex.items-center.gap-2.overflow-hidden.p-1');
    const invisibleButtons = document.querySelectorAll('img[alt="make invisible button"][src="/icons/eye.png"]');
    if (invisibleButtons.length > 1) {
      for (let i = 0; i < items.length; i++) {
        const itemName = items[i].textContent.trim();
        if (itemName !== 'Single Chair') {
          invisibleButtons[i].closest('button').click();
          console.log(`Clicked make invisible button for ${itemName} (index ${i})`);
          await new Promise(resolve => setTimeout(resolve, 200));
        } else {
          console.log(`Skipped make invisible button for Single Chair (index ${i})`);
        }
      }
    } else {
      console.log('Fewer than two make invisible buttons found, skipping');
    }

    // Step 6: Click Set as Default button
    const defaultButton = document.querySelector('button.bg-blue-600.rounded.p-2.text-white.font-medium.grow');
    if (!defaultButton) throw new Error('Set as Default button not found');
    defaultButton.click();
    console.log('Clicked Set as Default button');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 7: Click Save button
    const saveButton = document.querySelector('button.px-3.flex.gap-2.rounded-lg.items-center.py-2.bg-gray-200');
    if (!saveButton) throw new Error('Save button not found');
    saveButton.click();
    console.log('Clicked Save button');

    // Step 8: Wait for save operation and click Preview button
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds for save to complete
    const previewButton = document.querySelector('button.px-4.rounded-lg.py-2.flex.items-center.gap-2.text-white.bg-orange-600');
    if (!previewButton) throw new Error('Preview button not found');
    previewButton.click();
    console.log('Clicked Preview button');

    // Step 9: Wait for modal to appear, modify the Open in New Tab link, and click it
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds for modal stability
    const modal = document.querySelector('div.react-responsive-modal-modal');
    if (!modal) throw new Error('Modal not found');
    const openInNewTabLink = document.querySelector('a.px-2.py-1.shadow.cursor-pointer.hover\\:bg-gray-200.duration-150[target="_blank"][rel="noopener noreferrer"]');
    if (!openInNewTabLink) throw new Error('Open in New Tab link not found');
    // Modify the href to replace /product with /dvc
    openInNewTabLink.href = openInNewTabLink.href.replace('/product', '/dvc');
    console.log(`Modified link href to: ${openInNewTabLink.href}`);
    openInNewTabLink.click();
    console.log('Clicked Open in New Tab link');

    console.log('Automation completed successfully');
  } catch (error) {
    console.error('Automation failed:', error.message);
    alert('Automation failed: ' + error.message);
  }
})();