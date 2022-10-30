import { Controller, Get, Inject } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import NotFoundError from 'src/core/common/error/types/NotFoundError';
import Test from 'src/core/common/test/models/Test';
import GetTestsAndProcess from 'src/core/common/usecase/test/GetTestsAndProcess';
import Context from 'src/core/context/Context';

@ApiTags(`Tests`)
@Controller('/tests')
export class TestController {
  getTestsAndProcessApi: GetTestsAndProcess;

  constructor(@Inject('Core') core: Context) {
    this.getTestsAndProcessApi = core.useCase.getTestAndProcess;
  }

  @Get('/all')
  @ApiOkResponse({ description: `Fetches all tests.` })
  @ApiNotFoundResponse({ description: `Gives a 404 if no tests are found.` })
  async getAllTests(): Promise<Test[]> {
    const tests: Test[] = await this.getTestsAndProcessApi.consume();

    if (!tests) throw new NotFoundError(`No tests found`);

    return tests;
  }
}
