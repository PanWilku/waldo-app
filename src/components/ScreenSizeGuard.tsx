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
    return (
      <div className="flex w-full h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (windowWidth < minWidth) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center p-8">
          <div className="text-4xl mb-6">📱</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Screen Too Small
          </h1>
          <p className="text-gray-400 mb-6">
            This app requires a minimum width of {minWidth}px for the best
            experience.
          </p>
          <div className="bg-rose-500/20 border border-rose-500/30 rounded-lg p-4">
            <p className="text-rose-400 text-sm">
              Please use a larger screen or rotate your device.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
