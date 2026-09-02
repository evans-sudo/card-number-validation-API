import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ValidateCardDto } from './dto/validate-card.dto.js';

@Controller('cards')
export class CardsController {
  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validateCard(@Body() validateCardDto: ValidateCardDto) {
    // Placeholder implementation before adding the Luhn algorithm
    return {
      valid: true,
    };
  }
}
