import { useContext } from "react";
import {
  LanguageContext,
  TLanguage,
  TLanguageContext,
} from "../../Contexts/App.context";
import "./Game.styles.scss";
import { Flex } from "../../UI/Flex";
import { ProgessBar } from "../../UI/ProgessBar/ProgessBar";
import { useGameHook } from "../../hooks/gameHook";
import { GameContext, TGameContext } from "../../Contexts/gameContext";
import { TranslateText } from "../../utils/translate";
function printQuestionInLanguag(language: TLanguage) {
  if (language == "fr") return "trouve l'équivalent de";
  return "find the equivalent of";
}

export function Game() {
  const { language } = useContext(LanguageContext) as TLanguageContext;
  const translate = TranslateText(language);
  const { gameMode } = useContext(GameContext) as TGameContext;
  const {
    currentQuestion,
    suggestions,
    isCorrect,
    handleResponse,
    percentage,
    reset,
    leftQuestionsNumber,
    totalQuestionsNumber,
    tries,
  } = useGameHook(gameMode);

  return (
    <Flex isColumn id="game">
      <div>
        <ProgessBar percentage={percentage} progessColor="blue" />
      </div>
      <div>
        <p>
          <span>
            {totalQuestionsNumber - leftQuestionsNumber}/{totalQuestionsNumber}
          </span>{" "}
        </p>
        <p>{translate("Total essais ", "Total tries ")}</p>
        <p>
          <span>{tries}</span>{" "}
        </p>
      </div>

      <button id="reset-btn" onClick={reset}>
        {translate("Réinitialiser / Rejouer", "Reset / Replay")}
      </button>
      {percentage !== 100 && (
        <>
          <Flex isColumn>
            <h2 id="question">{printQuestionInLanguag(language)}</h2>
            <p id="question-number">{currentQuestion}</p>
          </Flex>

          <Flex
            id="suggestions"
            justifyContent="center"
            doWrap
            style={{ padding: "1em" }}
            gap="2em"
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
        </>
      )}
    </Flex>
  );
}
