export const handleNegativeValue = (rawText, numberText) => {
  let textNumber = numberText;
  let result = textNumber;

  if (rawText.includes('-')) {
    textNumber = `-${textNumber}`;
  }

  if (rawText.includes('-0') || rawText.includes('-0-') || rawText.includes('0-')) {
    textNumber = `-1`;
  }

  if (isNaN(textNumber) || textNumber === '' || !textNumber) {
    textNumber = 0;
  }
  result = textNumber;

  return result;
};
