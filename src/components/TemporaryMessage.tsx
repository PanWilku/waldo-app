"use client";

import { useWaldoGame } from "@/contexts/WaldoGameContext";

export default function TemporaryMessage() {
  const { temporaryMessage } = useWaldoGame();

  if (!temporaryMessage) return null;

  return (
    <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 border border-rose-500 text-rose-400 px-6 py-3 rounded-lg shadow-lg">
      {temporaryMessage}
    </div>
  );
}
