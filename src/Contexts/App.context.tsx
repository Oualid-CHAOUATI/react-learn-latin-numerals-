import React, { PropsWithChildren, useState } from "react";

// --------

export type TLanguage = "en" | "fr";
export type TLanguageContext = {
  language: TLanguage;
  toggleLanguage: () => void;
  isOpenCheat: boolean;
  toggleIsOpenCheat: () => void;
};

export const LanguageContext = React.createContext<TLanguageContext | null>(
  null
);

// type LanguageProviderProps=
export const LanguagePovider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<TLanguage>("fr");
  const [isOpenCheat, setIsOpenCheat] = useState<boolean>(false);

  const toggleIsOpenCheat = () => setIsOpenCheat((isOpen) => !isOpen);

  const toggleLanguage = () =>
    setLanguage((langue) => (langue === "fr" ? "en" : "fr"));

  const value: TLanguageContext = {
    language,
    toggleLanguage,
    isOpenCheat,
    toggleIsOpenCheat,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
