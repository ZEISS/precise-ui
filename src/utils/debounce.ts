export function debounce(func: (...arg: Array<unknown>) => void, wait = 1000) {
  let timeout: number | undefined;

  return function (...args: Array<unknown>) {
    const callNow = !wait && !timeout;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      timeout = undefined;

      if (wait) {
        func.apply(this, args);
      }
    }, wait);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
