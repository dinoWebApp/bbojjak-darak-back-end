import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { AccountEntity } from '../entities/account.entity';
import { Prisma } from '@prisma/client';
import { PrismaClientType } from 'src/modules/prisma/types/prisma.type';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AccountRepository
  implements
    IRepository<
      AccountEntity,
      Prisma.AccountCreateInput,
      Prisma.AccountUpdateInput
    >
{
  constructor(private readonly prismaService: PrismaService) {}
  create(
    data: Prisma.AccountCreateInput,
    prisma?: PrismaClientType,
  ): Promise<AccountEntity> {
    throw new Error('Method not implemented.');
  }
  async findById(
    id: number,
    prisma?: PrismaClientType,
  ): Promise<AccountEntity | null> {
    const client = prisma || this.prismaService;
    const account: AccountEntity | null = await client.account.findUnique({
      where: { id },
    });
    return account;
  }
  update(
    id: number,
    data: Prisma.AccountUpdateInput,
    prisma?: PrismaClientType,
  ): Promise<AccountEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number, prisma?: PrismaClientType): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(prisma?: PrismaClientType): Promise<AccountEntity[]> {
    throw new Error('Method not implemented.');
  }
}
