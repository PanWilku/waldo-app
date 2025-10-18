"use client";
import { useWindowSize } from "@/hooks/useWindowSize";

interface ScreenSizeGuardProps {
  children: React.ReactNode;
  minWidth?: number;
}

export default function ScreenSizeGuard({
  children,
  minWidth = 800,
}: ScreenSizeGuardProps) {
  const { width: windowWidth } = useWindowSize();

  if (windowWidth === undefined) {
    return <div>Loading...</div>;
  }

  if (windowWidth < minWidth) {
    return (
      <div
        className={`flex w-full h-screen items-center justify-center bg-red-500`}
      >
        <h1 className="text-white">App not available for your screen size.</h1>
      </div>
    );
  }

  return <>{children}</>;
}
