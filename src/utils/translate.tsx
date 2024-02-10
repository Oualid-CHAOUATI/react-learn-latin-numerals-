import { TLanguage } from "../Contexts/App.context";

export function TranslateText(lan: TLanguage) {
  return (fr: string, en: string) => {
    if (lan === "fr") return fr;
    return en;
  };
}
