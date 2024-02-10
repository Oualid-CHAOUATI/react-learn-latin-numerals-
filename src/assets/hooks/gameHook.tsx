import { useState } from "react";
import { shuffle } from "../../utils/shuffle";

const arabNumbersString = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20";
const romanNumbersString =
  "I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX";
export const arabNumbers = arabNumbersString.split(" ");
export const romanNumbers = romanNumbersString.split(" ");
const checkIfNumbersMatch = ({
  arab,
  roman,
}: {
  arab: string;
  roman: string;
}) => arabNumbers.indexOf(arab) == romanNumbers.indexOf(roman);

const CLEAN_SUGGESTIONS = romanNumbers.map((number: string) => ({
  value: number,
  disabled: false,
}));

const getSuffledQuestions = () => shuffle(arabNumbers);

export function useGameHook() {
  const totalQuestionsNumber = arabNumbers.length;
  const [questions, setQuestions] = useState(getSuffledQuestions());
  const restQuestionsNumber = questions.length;
  const percentage = 100 - (100 * restQuestionsNumber) / totalQuestionsNumber;

  const currentQuestion = questions[0];

  const [suggestions, setSuggestions] = useState(shuffle(CLEAN_SUGGESTIONS));

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const reset = () => {
    setQuestions(getSuffledQuestions());
    setSuggestions(shuffle(CLEAN_SUGGESTIONS));
  };
  const handleResponse = (roman: string) => {
    const isCorrectAnswer = checkIfNumbersMatch({
      arab: currentQuestion,
      roman,
    });

    setIsCorrect(isCorrectAnswer);
    setTimeout(() => {
      setIsCorrect(null);
    }, 600);
    if (!isCorrectAnswer) {
      setSuggestions((suggestions) =>
        suggestions.map((suggestion) => {
          if (suggestion.value === roman) {
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

      setSuggestions(shuffle(CLEAN_SUGGESTIONS));
    }
  };

  return {
    currentQuestion,
    suggestions,
    isCorrect,
    handleResponse,
    percentage,
    reset,
  };
}
