import { useEffect } from "react";

export const useUnloadWarning = (condition = true) => {
  useEffect(() => {
    if (!condition) {
      return;
    }
    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", listener);

    return () => window.addEventListener("beforeunload", listener);
  }, [condition]);
};
