import { Injectable, BadRequestException } from '@nestjs/common';
import { isLuhnValid } from './luhn.util.js';

@Injectable()
export class CardsService {
  public validateCard(cardNumber: string): boolean {
    const normalized = this.normalizeCardNumber(cardNumber);
    return isLuhnValid(normalized);
  }

  private normalizeCardNumber(cardNumber: string): string {
    const normalized = cardNumber.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(normalized)) {
      throw new BadRequestException('Card number contains invalid characters');
    }

    return normalized;
  }
}
