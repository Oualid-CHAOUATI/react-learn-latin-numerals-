import { useContext } from "react";
import "./Header.styles.scss";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
import { GameContext, TGameContext } from "../../Contexts/gameContext";
import { TranslateText } from "../../utils/translate";
export function Header() {
  const { language, toggleLanguage, isOpenCheat, toggleIsOpenCheat } =
    useContext(LanguageContext) as TLanguageContext;

  const translate = TranslateText(language);
  const { toggleGameMode, gameMode } = useContext(GameContext) as TGameContext;
  return (
    <header>
      <Flex justifyContent="space-between">
        <>
          <select
            name="language"
            id="select"
            onChange={toggleLanguage}
            value={language}
          >
            <option value="fr">fr</option>
            <option value="en">en</option>
          </select>
          <select
            name="game-mode"
            id="select"
            onChange={toggleGameMode}
            value={gameMode}
          >
            <option value="days">{translate("Jours", "Days")}</option>
            <option value="numbers">{translate("nombres", "Numbers")}</option>
          </select>

          <button id="cheat-btn" onClick={toggleIsOpenCheat}>
            {translate("tricher", "cheat")}
          </button>
        </>
      </Flex>
    </header>
  );
}
