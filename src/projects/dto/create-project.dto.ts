export class CreateProjectDto {
  name: string;

  description: string;

  started_at?: Date | null;

  forercasted_end?: Date | null;
}
