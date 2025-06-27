document.getElementById('runButton').addEventListener('click', () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = 'Running...';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'runAutomation' }, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
      } else if (response && response.status === 'success') {
        statusDiv.textContent = response.message;
      } else {
        statusDiv.textContent = 'Error: ' + (response ? response.message : 'Unknown error');
      }
    });
  });
});