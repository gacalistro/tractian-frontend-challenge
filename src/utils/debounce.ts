export function debounce(
  functionToCall: (...args: any[]) => void,
  wait: number = 300
): (...args: any[]) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      functionToCall(...args);
    }, wait);
  };
}
