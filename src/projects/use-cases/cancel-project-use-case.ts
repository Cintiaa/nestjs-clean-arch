import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';
import { CancelProjectDto } from '../dto/cancel-project.dto';

@Injectable()
export class CancelProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, input: CancelProjectDto) {
    const project = await this.projectRepo.findById(id);

    project.cancel(input.canceled_at);

    await this.projectRepo.update(project);

    return project;
  }
}
