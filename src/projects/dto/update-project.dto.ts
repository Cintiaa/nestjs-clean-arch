import { PartialType } from '@nestjs/mapped-types';

class _UpdateProjectDto {
  name: string;

  description: string;

  started_at: Date | null;

  canceled_at: Date | null;

  finished_at: Date | null;

  forercasted_end: Date | null;
}

export class UpdateProjectDto extends PartialType(_UpdateProjectDto) {}
