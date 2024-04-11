import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project-use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects-use-case';
import { StartProjectUseCase } from './use-cases/start-project-use-case';
import { StartProjectDto } from './dto/start-project-dto';
import { CancelProjectDto } from './dto/cancel-project.dto';
import { CancelProjectUseCase } from './use-cases/cancel-project-use-case';
import { FinishProjectDto } from './dto/finish-project.dto';
import { FinishProjectUseCase } from './use-cases/finish-project-use-case';
import { DeleteProjectUseCase } from './use-cases/delete-project-use-case';

@Controller('projects')
export class ProjectsWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Inject(CancelProjectUseCase)
  private readonly cancelProjectUseCase: CancelProjectUseCase;

  @Inject(FinishProjectUseCase)
  private readonly finishProjectUseCase: FinishProjectUseCase;

  @Inject(DeleteProjectUseCase)
  private readonly deleteProjectUseCase: DeleteProjectUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Body() cancelProjectDto: CancelProjectDto) {
    return this.cancelProjectUseCase.execute(id, cancelProjectDto);
  }

  @Post(':id/finish')
  finish(@Param('id') id: string, @Body() finishProjectDto: FinishProjectDto) {
    return this.finishProjectUseCase.execute(id, finishProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProjectUseCase.execute(id);
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.projectsService.findOne(id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //     return this.projectsService.update(id, updateProjectDto);
  //   }
}
