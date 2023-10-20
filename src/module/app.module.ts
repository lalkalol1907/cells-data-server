import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AuthService } from '../service/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'Auth',
          protoPath: './proto/auth.proto',
          url: process.env['AUTH_SERVER_URL'],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
