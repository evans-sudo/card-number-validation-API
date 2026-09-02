/**
 * Validates a numeric string using the Luhn algorithm.
 * Expects a normalized string containing only digits.
 */
export function isLuhnValid(cardNumber: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  // Process digits from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    // Double every second digit
    if (shouldDouble) {
      digit *= 2;
      // If doubling produces a value greater than 9, reduce it appropriately
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble; // Toggle the flag for the next digit
  }

  // Determine validity based on divisibility by 10
  return sum % 10 === 0;
}
