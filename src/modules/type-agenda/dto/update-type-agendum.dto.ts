import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAgendumDto } from './create-type-agendum.dto';

export class UpdateTypeAgendumDto extends PartialType(CreateTypeAgendumDto) {}
