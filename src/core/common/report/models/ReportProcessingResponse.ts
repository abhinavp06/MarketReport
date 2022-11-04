import { ReportStringEnum } from '../ReportStringEnum';

export interface ReportProcessingResponse {
  reportString: ReportStringEnum;
  additionalMessage?: string;
}
