import * as fs from 'fs';
import { appLogger } from 'src/repository/RepositoryModule';

export const deleteFile = (filePath: string): boolean => {
  const fileName: string = filePath.split(`.`)[0];

  fs.unlink(filePath, function (err) {
    if (err instanceof Error) {
      appLogger.error(
        `Failed to delete file ${fileName}. Reason: ${err.name}, ${err.message}`,
      );
      return false;
    } else {
      appLogger.info(`Successfully deleted file ${fileName}`);
    }
  });

  return true;
};
