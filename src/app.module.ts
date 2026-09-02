import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module.js';

@Module({
  imports: [CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
