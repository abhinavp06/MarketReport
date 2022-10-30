import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ReportStringEnum } from 'src/core/common/report/ReportStringEnum';
import GetDataAndReport from 'src/core/common/usecase/report/GetDataAndReport';
import Context from 'src/core/context/Context';
import { mapReportStringToError } from 'src/core/utils/MapReportStringToRestError';

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
  async getDataAndReport(
    @Body() comparisonDifference: any,
    @Res() response: Response,
  ): Promise<Response> {
    const result: ReportStringEnum = await this.getDataAndReportApi.consume(
      comparisonDifference.comparisonDifference,
    );

    return response.status(mapReportStringToError(result)).send(result);
  }
}
