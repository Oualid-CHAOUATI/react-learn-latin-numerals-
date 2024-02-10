import { useContext } from "react";
import {
  LanguageContext,
  TLanguage,
  TLanguageContext,
} from "../../Contexts/App.context";
import "./Game.styles.scss";
import { Flex } from "../../UI/Flex";
import { useGameHook } from "../../assets/hooks/gameHook";
import { ProgessBar } from "../../UI/ProgessBar/ProgessBar";
function printQuestionInLanguag(language: TLanguage) {
  if (language == "fr") return "trouve l'équivalent de";
  return "find the equivalent of";
}
export function Game() {
  const { language } = useContext(LanguageContext) as TLanguageContext;
  const {
    currentQuestion,
    suggestions,
    isCorrect,
    handleResponse,
    percentage,
    reset,
  } = useGameHook();

  return (
    <Flex isColumn id="game">
      <div>
        <ProgessBar percentage={percentage} progessColor="blue" />
      </div>

      {percentage == 100 && <button onClick={reset}>reset game</button>}
      <Flex isColumn>
        <h2 id="question">{printQuestionInLanguag(language)}</h2>
        <p id="question-number">{currentQuestion}</p>
      </Flex>

      <Flex id="suggestoins-wrapper" isColumn>
        <Flex
          id="suggestions"
          justifyContent="center"
          doWrap
          style={{ padding: "1em" }}
          gap="2em"
          // className={`${isCorrect ? "win" : ""}  ${
          // isCorrect === false ? "lose" : ""
          // }`}
          className={(() => {
            if (isCorrect === null) return;
            if (isCorrect) return "win"; //true
            else return "lose"; //False
          })()}
        >
          {suggestions.map(({ value, disabled }) => {
            return (
              <button
                key={value}
                disabled={disabled}
                onClick={() => handleResponse(value)}
              >
                {value}
              </button>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
