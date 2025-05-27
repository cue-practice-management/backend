import { IsEmail } from 'class-validator';

export class RecoverPasswordRequestDto {
  @IsEmail()
  email: string;
}
