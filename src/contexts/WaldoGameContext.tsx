"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface WaldoGameContextType {
  temporaryMessage: string | null;
  showTemporaryMessage: (message: string) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  resetGame: () => void;
  onResetCircles: (() => void) | null;
  setOnResetCircles: (callback: () => void) => void;
}

const WaldoGameContext = createContext<WaldoGameContextType | undefined>(
  undefined
);

export const useWaldoGame = () => {
  const context = useContext(WaldoGameContext);
  if (context === undefined) {
    throw new Error("useWaldoGame must be used within a WaldoGameProvider");
  }
  return context;
};

interface WaldoGameProviderProps {
  children: ReactNode;
}

export const WaldoGameProvider: React.FC<WaldoGameProviderProps> = ({
  children,
}) => {
  const [temporaryMessage, setTemporaryMessage] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [onResetCircles, setOnResetCircles] = useState<(() => void) | null>(
    null
  );

  const showTemporaryMessage = (message: string) => {
    setTemporaryMessage(message);
    setTimeout(() => {
      setTemporaryMessage(null);
    }, 3000);
  };

  const resetGame = () => {
    setGameCompleted(false);
    setTemporaryMessage(null);
    if (onResetCircles) {
      onResetCircles();
    }
  };

  const value = {
    temporaryMessage,
    showTemporaryMessage,
    gameCompleted,
    setGameCompleted,
    resetGame,
    onResetCircles,
    setOnResetCircles,
  };

  return (
    <WaldoGameContext.Provider value={value}>
      {children}
    </WaldoGameContext.Provider>
  );
};
