import { useContext, useEffect, useState } from "react";
import {
  LanguageContext,
  TLanguage,
  TLanguageContext,
} from "../../Contexts/App.context";
import "./Game.styles.scss";
import { Flex } from "../../UI/Flex";
import { getRandomInArray, shuffle } from "../../utils/shuffle";
function printQuestionInLanguag(language: TLanguage) {
  if (language == "fr") return "trouve l'équivalent de";
  return "find the equivalent of";
}

export function Game() {
  const { language, numbersMap } = useContext(
    LanguageContext
  ) as TLanguageContext;

  const [isCorrect, setIsCorrrect] = useState<boolean | null>(null);

  const [questions, setQuestions] = useState<string[]>(numbersMap.arab);
  const [question, setQuestion] = useState("");
  const [suggestions, setSuggestions] = useState(
    shuffle(
      numbersMap.roman.map((number: string) => ({
        value: number,
        disabled: false,
      }))
    )
  );
  useEffect(() => {
    const r = getRandomInArray(questions);

    console.log(r);
    console.log(questions);
    setQuestion(r as string);
  }, [questions]);

  const handleResponse = (response: string) => {
    const responseIndex = numbersMap.roman.indexOf(response);
    const questionIndex = numbersMap.arab.indexOf(question as string);

    const isCorrectAnswer = responseIndex === questionIndex;
    setIsCorrrect(isCorrectAnswer);

    setTimeout(() => {
      setIsCorrrect(null);
    }, 500);

    if (!isCorrectAnswer) {
      setSuggestions((suggestions) =>
        suggestions.map((suggestion) => {
          if (suggestion.value == response) {
            return { ...suggestion, disabled: true };
          }

          return suggestion;
        })
      );
    } else {
      setQuestions((questions) => {
        const newArr = [...questions];
        newArr.splice(questions.indexOf(question as string), 1);
        return newArr;
      });

      setSuggestions((suggestions) => {
        const resetSuggestions = suggestions.map((suggestion) => ({
          ...suggestion,
          disabled: false,
        }));

        return shuffle(resetSuggestions);
      });
    }
  };
  return (
    <Flex isColumn id="game">
      <Flex isColumn>
        <p id="question">{printQuestionInLanguag(language)}</p>
        <p id="question-number">{question as string}</p>
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
