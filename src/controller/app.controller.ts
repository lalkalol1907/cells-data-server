import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserData } from '../decorators/userdata.decorator';
import User from '../struct/User';

@Controller('/api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getHello(@UserData() user: User): Promise<string> {
    return user.email; // Тут все рабоатет
  }
}
