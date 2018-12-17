export function debounce(func: (...arg: Array<any>) => void, wait = 1000) {
  let timeout: number | undefined;

  return function(...args: Array<any>) {
    const context = this;
    const callNow = !wait && !timeout;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      timeout = undefined;

      if (wait) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
