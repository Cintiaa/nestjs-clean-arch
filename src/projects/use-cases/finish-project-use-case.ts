import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';
import { FinishProjectDto } from '../dto/finish-project.dto';

@Injectable()
export class FinishProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, input: FinishProjectDto) {
    const project = await this.projectRepo.findById(id);

    project.finish(input.finished_at);

    await this.projectRepo.update(project);

    return project;
  }
}
