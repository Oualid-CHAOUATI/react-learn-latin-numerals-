import { useContext } from "react";
import "./Header.styles.scss";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
import { GameContext, TGameContext } from "../../Contexts/gameContext";
export function Header() {
  const { language, toggleLanguage, isOpenCheat, toggleIsOpenCheat } =
    useContext(LanguageContext) as TLanguageContext;
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
            <option value="days">days</option>
            <option value="numbers">numbers</option>
          </select>

          <button id="cheat-btn" onClick={toggleIsOpenCheat}>
            {(() => {
              if (isOpenCheat) return "x";

              if (language == "fr") return "tricher";
              return "cheat";
            })()}
          </button>
        </>
      </Flex>
    </header>
  );
}
