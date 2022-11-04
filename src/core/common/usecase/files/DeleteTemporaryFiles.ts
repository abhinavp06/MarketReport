import * as fs from 'fs';
import { PinoLogger } from 'nestjs-pino';
import { deleteFile } from 'src/core/utils/FileUtils';

export class DeleteTemporaryFiles {
  private logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  consume(): void {
    this.logger.info(
      `${new Date().toString()}: Delete Files cronjob triggered.`,
    );

    let fileCounter = 0;
    let totalFileCounter = 0;

    const files: string[] = fs.readdirSync(
      `.`.concat(process.env.TEMP_FILES_BASE_PATH),
    );

    files.forEach((file) => {
      const fileExtension: string = file.substring(file.indexOf(`.`));
      const filePath: string = `.`.concat(
        process.env.TEMP_FILES_BASE_PATH.concat(file),
      );

      if (fileExtension === `.xlsx`) {
        totalFileCounter++;
        deleteFile(filePath) ? fileCounter++ : null;
      }
    });

    totalFileCounter
      ? this.logger.info(
          `Successfully deleted ${fileCounter} temporary excel files out of ${totalFileCounter}.`,
        )
      : this.logger.info(
          `No temporary excel files found that need to be deleted.`,
        );

    return;
  }
}
