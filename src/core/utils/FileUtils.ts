import * as fs from 'fs';

export const deleteFile = (filePath: string): boolean => {
  const fileName: string = filePath.split(`.`)[1];

  fs.unlink(filePath, function (err) {
    if (err instanceof Error) {
      console.log(
        `Failed to delete file ${fileName}. Reason: ${err.name}, ${err.message}`,
      );
      return false;
    } else {
      console.log(`Successfully deleted file ${fileName}`);
    }
  });

  return true;
};
