import { useEffect, useRef } from "react";
import { BOOLEAN } from "~/constants";

export function useComponentDidMount() {
  const isMounted = useRef<boolean>(BOOLEAN.FALSE);

  useEffect(() => {
    if (!isMounted.current) isMounted.current = BOOLEAN.TRUE;
  }, []);

  return isMounted.current;
}
