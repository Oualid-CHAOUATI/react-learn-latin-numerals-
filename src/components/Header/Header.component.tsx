import { useContext } from "react";
import "./Header.styles.scss";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
export function Header() {
  const { language, toggleLanguage, isOpenCheat, toggleIsOpenCheat } =
    useContext(LanguageContext) as TLanguageContext;
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
