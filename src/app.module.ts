import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './common/config/EnvConfig';
import { envSchemaJoi } from './common/config/env.schema';
import { DatabaseModule } from './common/database/database.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: envSchemaJoi,
      isGlobal: true,
    }),
    DatabaseModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
