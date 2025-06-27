document.addEventListener('DOMContentLoaded', () => {
  // Check if automation is enabled
  chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled !== false) {
      executeAutomation();
    }
  });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'runAutomation') {
      executeAutomation();
      sendResponse({ status: 'Automation executed' });
    }
  });

  function executeAutomation() {
    // Step 1: Store the name from the specified div
    const nameDiv = document.querySelector('div.font.bold.text-lg');
    if (!nameDiv) {
      console.error('Name div not found');
      return;
    }
    const name = nameDiv.textContent.trim();
    console.log('Stored name:', name);

    // Step 2: Click the "Presets" tab
    const presetsTab = document.querySelector('div.text-orange-600.border-b-2.border-orange-600');
    if (presetsTab) {
      presetsTab.click();
      console.log('Clicked Presets tab');
    } else {
      console.error('Presets tab not found');
    }

    // Step 3: Click all "make visible" buttons
    const visibleButtons = document.querySelectorAll('img[alt="make visible button"][src="/icons/eyeHidden.png"]');
    visibleButtons.forEach((button) => {
      button.closest('button').click();
      console.log('Clicked make visible button');
    });

    // Step 4: Select the matching option in each dropdown
    const selectElements = document.querySelectorAll('select.text-orange-600');
    selectElements.forEach((select) => {
      const option = Array.from(select.options).find((opt) =>
        opt.text.includes(`${name}-`)
      );
      if (option) {
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`Selected option ${option.text} in dropdown`);
      } else {
        console.warn(`No matching option for ${name} in dropdown`);
      }
    });

    // Step 5: Click "Set as Default" button
    const setDefaultButton = document.querySelector('button.bg-blue-600');
    if (setDefaultButton) {
      setDefaultButton.click();
      console.log('Clicked Set as Default button');
    } else {
      console.error('Set as Default button not found');
    }

    // Step 6: Click "Save" button
    const saveButton = document.querySelector('button img[src="/icons/save.png"]').closest('button');
    if (saveButton) {
      saveButton.click();
      console.log('Clicked Save button');
    } else {
      console.error('Save button not found');
    }
  }
});

// Handle dynamic content by retrying automation after a delay
setTimeout(() => {
  chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled !== false) {
      executeAutomation();
    }
  });
}, 2000);