document.getElementById('copyBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const texts = [...document.querySelectorAll('strong')]
          .map(el => el.innerText.trim())
          .filter(Boolean);
        const textToCopy = texts.join('\n');
  
        // Instead of navigator.clipboard, create a hidden textarea and copy manually
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
  
        alert('Copied ' + texts.length + ' strong tags!');
      }
    });
  });
  