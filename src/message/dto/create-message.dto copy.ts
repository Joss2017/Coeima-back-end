import { IsNotEmpty } from 'class-validator';

export class CreateAdminMessageDto {
  @IsNotEmpty({ message: 'Le message ne peut pas être vide' })
  body: string;
}
