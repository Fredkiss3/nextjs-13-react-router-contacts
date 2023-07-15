export function wait(ms: number): Promise<void> {
  // Wait for the specified amount of time
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @example
 *   const fn = debounce(() => { console.log(...) })
 *
 *   // Only the second call will be executed
 *   fn()
 *   fn()
 *
 * @param callback
 * @param delay
 */

export function debounce<T extends Function>(
  callback: T,
  delay: number = 500
): T {
  let timer: any;
  const fn = (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      callback.apply(this, args);
    }, delay);
  };
  return fn as unknown as T;
}
