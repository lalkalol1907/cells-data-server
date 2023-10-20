import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.authService
      .checkToken('ddf138d5-3730-4421-84df-8b98b808dac1')
      .toPromise()
      .then((u) => u.nickname); // Тут все рабоатет
  }
}
