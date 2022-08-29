import { Controller, Get } from '@nestjs/common';
import { AppService, ISearchLists } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('searchList')
  async searchList(): Promise<ISearchLists> {
    return this.appService.getSearchList();
  }
}
