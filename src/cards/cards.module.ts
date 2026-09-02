import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller.js';

@Module({
  controllers: [CardsController],
})
export class CardsModule {}
