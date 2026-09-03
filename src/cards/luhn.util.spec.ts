import { describe, it, expect } from 'vitest';
import { isLuhnValid } from './luhn.util.js';

describe('Luhn Validator (isLuhnValid)', () => {
  it('should return true for a known valid Visa card number', () => {
    const validVisa = '4111111111111111';
    expect(isLuhnValid(validVisa)).toBe(true);
  });

  it('should return false for a known invalid card number', () => {
    const invalidCard = '4111111111111112';
    expect(isLuhnValid(invalidCard)).toBe(false);
  });

  it('should return true for another known valid card number (Mastercard)', () => {
    const validMastercard = '5105105105105100';
    expect(isLuhnValid(validMastercard)).toBe(true);
  });

  it('should return false if a single digit in a valid card is mistyped', () => {
    // Changing the 8th digit from a 1 to a 2
    const mistypedCard = '4111111211111111';
    expect(isLuhnValid(mistypedCard)).toBe(false);
  });
});
