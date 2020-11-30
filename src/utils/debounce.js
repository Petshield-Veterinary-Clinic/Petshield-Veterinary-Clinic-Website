export const debounce = (duration, fn) =>
  clearTimeout(setTimeout(fn, duration));
