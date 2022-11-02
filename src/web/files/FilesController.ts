import { Controller, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeleteTemporaryFiles } from 'src/core/common/usecase/files/DeleteTemporaryFiles';
import Context from 'src/core/context/Context';

@Controller('/files')
export class FilesController {
  deleteTemporaryFilesUsecase: DeleteTemporaryFiles;

  constructor(@Inject('Core') core: Context) {
    this.deleteTemporaryFilesUsecase = core.useCase.deleteTemporaryFiles;
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  deleteTemporaryFiles(): void {
    return this.deleteTemporaryFilesUsecase.consume();
  }
}
