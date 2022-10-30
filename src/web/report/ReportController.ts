import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import RestError, {
  BAD_GATEWAY_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESS_RESPONSE,
} from 'src/core/common/error/types/RestError';
import { ReportStringEnum } from 'src/core/common/report/ReportStringEnum';
import GetDataAndReport from 'src/core/common/usecase/report/GetDataAndReport';
import Context from 'src/core/context/Context';

@ApiTags('Reports')
@Controller('/report')
export class ReportController {
  getDataAndReportApi: GetDataAndReport;

  constructor(@Inject('Core') core: Context) {
    this.getDataAndReportApi = core.useCase.getDataAndReport;
  }

  @Post('/history')
  @ApiOperation({
    description: `Sends an email containing a customized report.`,
  })
  @ApiOkResponse({
    status: 200,
    description: `Data was processed and the report was sent successfully.`,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: `Error while processing data.`,
  })
  @ApiServiceUnavailableResponse({
    status: 503,
    description: `Data was processed successfully but the report was not sent.`,
  })
  @ApiBody({
    description: 'The comparison difference here.',
    required: false,
    examples: {
      a: {
        summary: 'Comparison difference is 1',
        description: `1 means that you want to compare each day's price.`,
        value: { comparisonDifference: 1 },
      },
      b: {
        summary: 'Comparison difference is 2',
        description: `2 means that you want to compare prices every 2 days.`,
        value: { comparisonDifference: 2 },
      },
      c: {
        summary: 'Comparison difference is 7',
        description: `7 means that you want to compare prices every 7 days.`,
        value: { comparisonDifference: 7 },
      },
    },
  })
  async getDataAndReport(@Body() comparisonDifference: any): Promise<void> {
    const res: ReportStringEnum = await this.getDataAndReportApi.consume(
      comparisonDifference.comparisonDifference,
    );

    switch (res) {
      case ReportStringEnum.processingError:
        throw new RestError(res, INTERNAL_SERVER_ERROR);
      case ReportStringEnum.emailError:
        throw new RestError(res, BAD_GATEWAY_ERROR);
      default:
        throw new RestError(res, SUCCESS_RESPONSE);
    }
  }
}
