import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateCardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber!: string;
}
