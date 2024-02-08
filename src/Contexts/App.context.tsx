import React, { PropsWithChildren, useState } from "react";

const arabNumbersString = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20";
const romanNumbersString =
  "I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX";

const numbersMap = {
  arab: arabNumbersString.split(" "),
  roman: romanNumbersString.split(" "),
};

// --------

export type TLanguage = "en" | "fr";
export type TLanguageContext = {
  language: TLanguage;
  toggleLanguage: () => void;
  numbersMap: typeof numbersMap;
  isOpenCheat: boolean;
  toggleIsOpenCheat: () => void;
};

export const LanguageContext = React.createContext<TLanguageContext | null>(
  null
);

// type LanguageProviderProps=
export const LanguagePovider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [isOpenCheat, setIsOpenCheat] = useState<boolean>(false);

  const toggleIsOpenCheat = () => setIsOpenCheat((isOpen) => !isOpen);

  const toggleLanguage = () =>
    setLanguage((langue) => (langue === "fr" ? "en" : "fr"));

  const value: TLanguageContext = {
    language,
    toggleLanguage,
    numbersMap,
    isOpenCheat,
    toggleIsOpenCheat,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
