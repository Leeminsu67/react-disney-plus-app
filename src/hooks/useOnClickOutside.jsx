import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // useRef로 들고온 요소에 hooks로 이벤트를 주는 방법
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    // document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      // document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
