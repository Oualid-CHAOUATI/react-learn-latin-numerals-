import { useContext, useEffect, useState } from "react";
import {
  LanguageContext,
  TLanguage,
  TLanguageContext,
} from "../../Contexts/App.context";
import "./Game.styles.scss";
import { Flex } from "../../UI/Flex";
import { getRandomInArray } from "../../utils/shuffle";
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
    numbersMap.roman.map((number: string) => ({
      value: number,
      disabled: false,
    }))
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

      setSuggestions((suggestions) =>
        suggestions.map((suggestion) => ({ ...suggestion, disabled: false }))
      );
    }
  };
  return (
    <Flex isColumn id="game">
      <Flex isColumn>
        <p id="question">{printQuestionInLanguag(language)}</p>
        <p
          id="question-number"
          className={`${isCorrect ? "win" : ""}  ${
            isCorrect === false ? "lose" : ""
          }`}
        >
          {question as string}
        </p>
      </Flex>

      <Flex id="suggestoins-wrapper" isColumn>
        <Flex id="suggestions" justifyContent="center" doWrap>
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

        <button>
          {language == "en"
            ? "Shuffle suggestions"
            : "aléatoire les suggestions"}
        </button>
      </Flex>
    </Flex>
  );
}
