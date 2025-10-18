"use client";

import { useWaldoGame } from "@/contexts/WaldoGameContext";

interface SuccessDialogProps {
  onRetry: () => void;
  onMenu: () => void;
}

export default function SuccessDialog({ onRetry, onMenu }: SuccessDialogProps) {
  const { gameCompleted, resetGame } = useWaldoGame();

  if (!gameCompleted) return null;

  const handleRetry = () => {
    resetGame();
    onRetry();
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-rose-500 p-8 rounded-lg text-center max-w-md mx-4 shadow-2xl shadow-rose-500/20">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-rose-400 mb-2">
        Congratulations!
      </h2>
      <p className="text-rose-300 mb-6">You found Waldo! Good job!</p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleRetry}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded transition-colors cursor-pointer"
        >
          Play Again
        </button>
        <button
          onClick={onMenu}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors cursor-pointer"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}
