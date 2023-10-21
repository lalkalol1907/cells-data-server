import { Controller, Get } from '@nestjs/common';
import { UserData } from '../../decorator/userdata.decorator';
import IUser from '../../struct/IUser';

@Controller('/api')
export class ApiController {
  @Get('/get-tables-by-user')
  async getTablesByUser(@UserData() user: IUser): Promise<string> {
    return user.email; // Тут все рабоатет
  }

  @Get('/get-my-tables')
  async getMyTables(@UserData() user: IUser): Promise<string> {
    return user.email; // Тут все рабоатет
  }

  @Get('/get-table-cells')
  async getTableCells(@UserData() user: IUser): Promise<string> {
    return user.email; // Тут все рабоатет
  }
}
