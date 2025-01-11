// app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('setCache')
  async setCache(@Body() body: { key: string; value: string }) {
    const { key, value } = body;
    console.log(body);
    const response = await this.appService.setCache(key, value);
    return { message: `Cache set with key: ${key}`, response };
  }

  @Get('getCache')
  async getCache() {
    await this.appService.getCache();
    return 'Hello World from Valkey Redis';
  }

  @Get('getCacheByKey')
  async getCacheByKey(@Body() body: { key: string }) {
    const { key } = body;
    const value = await this.appService.getCacheByKey(key);
    return { value };
  }
}
