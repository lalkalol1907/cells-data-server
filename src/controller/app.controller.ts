import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): Observable<string> {
    return this.authService.checkToken('ddf138d5-3730-4421-84df-8b98b808dac1');
  }
}
