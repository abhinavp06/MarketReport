import { ReportProcessingResponse } from 'src/core/common/report/models/ReportProcessingResponse';
import { ReportStringEnum } from 'src/core/common/report/ReportStringEnum';

export const callEmailApi = async ({
  email,
  attachment,
  fileName,
}: {
  email: string;
  attachment: string;
  fileName: string;
}): Promise<ReportProcessingResponse> => {
  return {
    reportString: ReportStringEnum.successResponse,
    additionalMessage: `${fileName} was processed successfully! Email has been sent.`,
  };
};
