/**
Returns a random integer between 0 and the specified maximum value.
@param maxNumber - the upper bound (inclusive) of the random integer to be generated.
@returns a random integer between 0 and maxNumber.
 */
export function getRandomInt(maxNumber: number) {
  return Math.floor(Math.random() * (maxNumber + 1));
}

export function getRandomInArray<T>(array: T[]) {
  return array[getRandomInt(array.length - 1)];
}
export function shuffle<T>(array: T[]) {
  const shuffledArraay = [...array];
  for (let i = 0; i < array.length; i++) {
    const j = getRandomInt(array.length - 1);
    [shuffledArraay[i], shuffledArraay[j]] = [
      shuffledArraay[j],
      shuffledArraay[i],
    ];
  }
  return shuffledArraay;
}
