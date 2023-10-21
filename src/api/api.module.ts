import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import UserdataMiddleware from '../Middleware/userdata.middleware';
import { AuthModule } from '../Auth/auth.module';
import AuthMiddleware from '../Middleware/auth.middleware';
import { EditController } from './controllers/edit.controller';

@Module({
  imports: [AuthModule],
  controllers: [ApiController, EditController],
  providers: [],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserdataMiddleware).forRoutes('api/');
    consumer.apply(AuthMiddleware).forRoutes('api/edit');
  }
}
