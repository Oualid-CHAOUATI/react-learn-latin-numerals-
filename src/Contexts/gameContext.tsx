import React, { PropsWithChildren, useState } from "react";

// --------

export type TGameMode = "numbers" | "days";
export type TGameContext = { gameMode: TGameMode; toggleGameMode: () => void };

export const GameContext = React.createContext<TGameContext | null>(null);

// type LanguageProviderProps=
export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameMode, setGameMode] = useState<TGameMode>("days");

  const toggleGameMode = () =>
    setGameMode((game) => (game === "days" ? "numbers" : "days"));

  const value: TGameContext = {
    gameMode,
    toggleGameMode,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
