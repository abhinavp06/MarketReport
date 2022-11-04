import { ReportStringEnum } from 'src/core/common/report/ReportStringEnum';
import { RestErrorEnum } from '../common/error/types/RestError';
export const mapReportStringToError = (
  reportString: ReportStringEnum,
): RestErrorEnum => {
  switch (reportString) {
    case ReportStringEnum.processingError:
      return RestErrorEnum.INTERNAL_SERVER_ERROR;
    case ReportStringEnum.emailError:
      return RestErrorEnum.BAD_GATEWAY_ERROR;
    default:
      return RestErrorEnum.SUCCESS_RESPONSE;
  }
};
