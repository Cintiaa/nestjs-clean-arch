import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsWithUseCaseController } from './projects-with-use-cases.controller';
import { CreateProjectUseCase } from './use-cases/create-project-use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects-use-case';
import { StartProjectUseCase } from './use-cases/start-project-use-case';
import { ProjectTypeOrmRepository } from './project.repository';
import { CancelProjectUseCase } from './use-cases/cancel-project-use-case';
import { FinishProjectUseCase } from './use-cases/finish-project-use-case';
import { DeleteProjectUseCase } from './use-cases/delete-project-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [
    //ProjectsController,
    ProjectsWithUseCaseController,
  ],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    CancelProjectUseCase,
    FinishProjectUseCase,
    DeleteProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
