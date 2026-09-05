document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const content = document.getElementById(button.dataset.copy);
    const status = button.parentElement.querySelector('[aria-live]');
    try {
      await navigator.clipboard.writeText(content.textContent);
      status.textContent = button.dataset.copied;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(content);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = button.dataset.failed;
    }
  });
});
