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

const _checkAnswer = (
  gameMode: TGameMode,
  question: string,
  answer: string
) => {
  if (gameMode == "days")
    return checkIfDaysMatch({ french: question, english: answer });
  else return checkIfNumbersMatch({ arab: question, roman: answer });
};

const _getCleanSuggestions = (gameMode: TGameMode) => {
  let array = gameMode == "days" ? englishDaysArray : romanNumbers;
  return array.map((value: string) => ({
    value,
    disabled: false,
  }));
};

const _getQuestions = (gameMode: TGameMode) => {
  return gameMode == "days" ? frenchDaysArray : arabNumbers;
};

function getFunctions(gameMod: TGameMode) {
  const getQuestions = () => _getQuestions(gameMod);
  const getCleanSuggestions = () => _getCleanSuggestions(gameMod);
  const checkAnswer = (question: string, answer: string) =>
    _checkAnswer(gameMod, question, answer);

  return { getQuestions, getCleanSuggestions, checkAnswer };
}

export function useGameHook(gameMod: TGameMode) {
  const { getQuestions, checkAnswer, getCleanSuggestions } =
    getFunctions(gameMod);

  const totalQuestionsNumber = _getQuestions(gameMod).length;
  const [questions, setQuestions] = useState(shuffle(getQuestions()));
  const [suggestions, setSuggestions] = useState(
    shuffle(getCleanSuggestions())
  );

  const disabledSuggestion = (answerSuggestion: string) => {
    setSuggestions((suggestions) =>
      suggestions.map((suggestion) => {
        if (suggestion.value === answerSuggestion) {
          return { ...suggestion, disabled: true };
        }

        return suggestion;
      })
    );
  };
  const removeFirstQuestion = () => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions.shift();
      return newQuestions;
    });
  };
  const [tries, setTries] = useState(0);
  const leftQuestionsNumber = questions.length;
  const percentage = Math.round(
    100 - (100 * leftQuestionsNumber) / totalQuestionsNumber
  );

  const currentQuestion = questions[0];
  useEffect(() => {
    setQuestions(shuffle(getQuestions()));
    setSuggestions(shuffle(getCleanSuggestions()));
    setTries(0);
  }, [gameMod]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const reset = () => {
    setQuestions(shuffle(getQuestions()));
    setSuggestions(shuffle(getCleanSuggestions()));
    setTries(0);
  };
  const handleResponse = (answer: string) => {
    setTries((tries) => tries + 1);

    const isCorrectAnswer = checkAnswer(currentQuestion, answer);

    setIsCorrect(isCorrectAnswer);
    setTimeout(() => {
      setIsCorrect(null);
    }, 600);

    if (!isCorrectAnswer) {
      disabledSuggestion(answer);
    } else {
      removeFirstQuestion();

      setSuggestions(shuffle(getCleanSuggestions()));
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
