import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ValidateCardDto } from './dto/validate-card.dto.js';
import { CardsService } from './cards.service.js';
import { isLuhnValid } from './luhn.util.js';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validateCard(@Body() validateCardDto: ValidateCardDto) {
    const normalizedCardNumber = this.cardsService.normalizeCardNumber(
      validateCardDto.cardNumber,
    );

    const isValid = isLuhnValid(normalizedCardNumber);

    return {
      valid: isValid,
    };
  }
}
