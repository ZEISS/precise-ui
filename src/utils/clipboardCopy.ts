export function clipboardCopy(content: string) {
  const el = document.createElement('textarea');
  el.value = content;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selection = document && document.getSelection();

  if (selection) {
    const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
      selection.removeAllRanges();
      selection.addRange(selected);
    }
  }
}
