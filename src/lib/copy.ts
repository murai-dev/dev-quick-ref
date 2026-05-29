export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pre = btn.nextElementSibling as HTMLPreElement | null;
      const text = pre?.textContent?.trim() ?? '';

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback: select the text so the user can copy manually
        if (pre) {
          const range = document.createRange();
          range.selectNodeContents(pre);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
        return;
      }

      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    });
  });
}
