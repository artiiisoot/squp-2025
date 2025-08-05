import { useEffect } from "react";

const useEnterKey = (handleEvent) => {
  useEffect(() => {
    const activeEnter = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEvent();
      }
    };

    window.addEventListener("keydown", activeEnter);

    return () => {
      window.removeEventListener("keydown", activeEnter);
    };
  }, [handleEvent]);
};

export default useEnterKey;
