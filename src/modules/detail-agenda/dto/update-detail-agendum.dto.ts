import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailAgendumDto } from './create-detail-agendum.dto';

export class UpdateDetailAgendumDto extends PartialType(CreateDetailAgendumDto) {}
