import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(), ApiModule],
})
export class AppModule {}
