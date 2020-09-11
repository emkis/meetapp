import numberConverter from 'number-to-words'

export function numberToWord(number) {
  return numberConverter.toWords(number)
}
