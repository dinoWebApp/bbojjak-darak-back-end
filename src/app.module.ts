import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ApiKeyMiddleware } from './middlewares/api-key/api-key.middleware';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 10 * 60 * 1000,
    }),
    PrismaModule,
    AdminModule,
    ApiKeysModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
