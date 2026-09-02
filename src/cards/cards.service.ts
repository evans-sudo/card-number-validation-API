import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CardsService {
  normalizeCardNumber(cardNumber: string): string {
    const normalized = cardNumber.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(normalized)) {
      throw new BadRequestException('Card number contains invalid characters');
    }

    return normalized;
  }
}
