import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountRepository } from './repositories/account.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountRepository],
  exports: [AccountRepository],
})
export class AccountsModule {}
