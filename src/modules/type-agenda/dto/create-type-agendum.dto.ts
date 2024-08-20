import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeAgendumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
