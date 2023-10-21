import { Controller, Post } from '@nestjs/common';
import { UserData } from '../../Decorator/userdata.decorator';
import IUser from '../../Struct/IUser';

@Controller('/api/edit')
export class EditController {
  @Post('/create-table')
  async createTable(@UserData() user: IUser): Promise<string> {
    return user.email; // Тут все рабоатет
  }
}
