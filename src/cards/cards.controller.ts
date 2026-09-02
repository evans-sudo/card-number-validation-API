import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ValidateCardDto } from './dto/validate-card.dto.js';
import { CardsService } from './cards.service.js';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validateCard(@Body() validateCardDto: ValidateCardDto) {
    const isValid = this.cardsService.validateCard(validateCardDto.cardNumber);

    return {
      valid: isValid,
    };
  }
}
