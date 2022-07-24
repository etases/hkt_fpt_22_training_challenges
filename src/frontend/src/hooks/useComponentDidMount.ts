import { useEffect, useRef } from "react";

export function useComponentDidMount() {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
  }, []);

  return isMounted.current;
}
