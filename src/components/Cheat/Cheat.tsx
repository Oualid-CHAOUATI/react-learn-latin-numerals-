import { useContext } from "react";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
import "./Cheat.styles.scss";
import {
  arabNumbers,
  romanNumbers,
  frenchDaysArray,
  englishDaysArray,
} from "../../hooks/gameHook";
import { GameContext, TGameContext } from "../../Contexts/gameContext";

export function Cheat() {
  const { isOpenCheat } = useContext(LanguageContext) as TLanguageContext;

  const { gameMode } = useContext(GameContext) as TGameContext;
  const questionsArray = gameMode == "days" ? frenchDaysArray : arabNumbers;
  const answersArray = gameMode == "days" ? englishDaysArray : romanNumbers;
  if (!isOpenCheat) return null;
  return (
    <div className="cheat">
      <Flex isColumn alignItems="center">
        <>
          {questionsArray.map((number: string, index: number) => (
            <Flex alignItems="center">
              <>
                <div>{number}</div> <span className="separator"></span>{" "}
                <div>{answersArray[index]}</div>
              </>
            </Flex>
          ))}
        </>
      </Flex>
    </div>
  );
}
