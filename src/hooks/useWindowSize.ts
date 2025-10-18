import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      console.log("🔄 Window resized! Width:", newWidth, "Height:", newHeight);
      setWindowSize({
        width: newWidth,
        height: newHeight,
      });
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowSize;
}
