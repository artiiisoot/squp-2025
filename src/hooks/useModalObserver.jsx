import { useEffect } from "react";

const useModalObserver = () => {
  useEffect(() => {
    const body = document.body;

    const observer = new MutationObserver((mutations) => {
      let hasOverlay = false;

      mutations.forEach((mutation) => {
        // 추가된 노드 중 modal 또는 bottom-sheet가 있는지 확인
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === 1 &&
            (node.classList.contains("modal") ||
              node.classList.contains("bottom-sheet"))
          ) {
            hasOverlay = true;
          }
        });

        // 제거된 노드 중 modal 또는 bottom-sheet가 있었는지 확인
        mutation.removedNodes.forEach((node) => {
          if (
            node.nodeType === 1 &&
            (node.classList.contains("modal") ||
              node.classList.contains("bottom-sheet"))
          ) {
            // 제거된 후에도 다른 overlay가 남아있는지 체크
            const remaining = document.querySelectorAll(
              ".modal, .bottom-sheet"
            );
            if (remaining.length === 0) {
              body.classList.remove("hold");
            }
          }
        });

        if (hasOverlay) {
          body.classList.add("hold");
        }
      });
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
};

export default useModalObserver;
