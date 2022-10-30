import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ReportProcessingResponse } from 'src/core/common/report/models/ReportProcessingResponse';
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
  @ApiConsumes(`multipart/form-data`)
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
    schema: {
      type: 'object',
      properties: {
        comparisonDifference: {
          type: 'integer',
          description: `<html>The difference in days to be considered while comparing prices. If nothing is sent, then <b>default is 1</b>.<br/> 2 means that you want to compare prices every 2 days.<br/>7 means that you want to compare prices every 7 days.</html>`,
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async getDataAndReport(
    @Body() comparisonDifference: any,
    @Res() response: Response,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<Response> {
    const result: ReportProcessingResponse =
      await this.getDataAndReportApi.consume(
        comparisonDifference.comparisonDifference,
        file,
      );

    return response
      .status(mapReportStringToError(result.reportString))
      .send(result);
  }
}
