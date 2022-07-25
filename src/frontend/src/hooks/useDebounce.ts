import { useEffect, useState } from "react";
import { DEBOUNCE } from "~/constants";

export function useDebounce<T>(
  value: T,
  delay: number = DEBOUNCE.VALUE.DEFAULT
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
