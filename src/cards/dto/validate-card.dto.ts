import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ValidateCardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  cardNumber!: string;
}
