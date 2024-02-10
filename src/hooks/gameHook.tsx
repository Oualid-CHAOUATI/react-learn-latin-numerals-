import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
import { TGameMode } from "../Contexts/gameContext";

const arabNumbersString = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20";
const romanNumbersString =
  "I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX";
export const arabNumbers = arabNumbersString.split(" ");
export const romanNumbers = romanNumbersString.split(" ");

const frenchDaysString = "lundi mardi mercredi jeudi vendredi samedi dimanche";
export const frenchDaysArray = frenchDaysString.split(" ");
const englishDaysString =
  "Monday Tuesday Wednesday Thursday Friday Saturday Sunday";
export const englishDaysArray = englishDaysString.split(" ");

const checkIfNumbersMatch = ({
  arab,
  roman,
}: {
  arab: string;
  roman: string;
}) => arabNumbers.indexOf(arab) == romanNumbers.indexOf(roman);

const checkIfDaysMatch = ({
  french,
  english,
}: {
  french: string;
  english: string;
}) => frenchDaysArray.indexOf(french) == englishDaysArray.indexOf(english);

const checkIfMatch = (
  gameMode: TGameMode,
  { question, answer }: { question: string; answer: string }
) => {
  if (gameMode == "days")
    return checkIfDaysMatch({ french: question, english: answer });
  else return checkIfNumbersMatch({ arab: question, roman: answer });
};

const getCleanSuggestions = (gameMode: TGameMode) => {
  let array = gameMode == "days" ? englishDaysArray : romanNumbers;
  return array.map((value: string) => ({
    value,
    disabled: false,
  }));
};

const getSuffledQuestions = (gameMode: TGameMode) => {
  const array = gameMode == "days" ? frenchDaysArray : arabNumbers;

  return shuffle(array);
};

const getQuestions = (gameMode: TGameMode) => {
  return gameMode == "days" ? frenchDaysArray : arabNumbers;
};
export function useGameHook(gameMod: TGameMode) {
  const totalQuestionsNumber = getQuestions(gameMod).length;
  const [questions, setQuestions] = useState(getSuffledQuestions(gameMod));
  const [suggestions, setSuggestions] = useState(
    shuffle(getCleanSuggestions(gameMod))
  );
  const [tries, setTries] = useState(0);

  useEffect(() => {
    setQuestions(getSuffledQuestions(gameMod));
    setSuggestions(shuffle(getCleanSuggestions(gameMod)));
    setTries(0);
  }, [gameMod]);

  const leftQuestionsNumber = questions.length;
  const percentage = Math.round(
    100 - (100 * leftQuestionsNumber) / totalQuestionsNumber
  );

  const currentQuestion = questions[0];

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const reset = () => {
    setQuestions(getSuffledQuestions(gameMod));
    setSuggestions(shuffle(getCleanSuggestions(gameMod)));
    setTries(0);
  };
  const handleResponse = (answer: string) => {
    setTries((tries) => tries + 1);

    const isCorrectAnswer = checkIfMatch(gameMod, {
      question: currentQuestion,
      answer,
    });

    setIsCorrect(isCorrectAnswer);
    setTimeout(() => {
      setIsCorrect(null);
    }, 600);
    if (!isCorrectAnswer) {
      setSuggestions((suggestions) =>
        suggestions.map((suggestion) => {
          if (suggestion.value === answer) {
            return { ...suggestion, disabled: true };
          }

          return suggestion;
        })
      );
    } else {
      setQuestions((questions) => {
        const newQuestions = [...questions];
        newQuestions.shift();
        return newQuestions;
      });

      setSuggestions(shuffle(getCleanSuggestions(gameMod)));
    }
  };

  return {
    currentQuestion,
    suggestions,
    isCorrect,
    handleResponse,
    percentage,

    reset,
    tries,
    totalQuestionsNumber,
    leftQuestionsNumber,
  };
}
