import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prismaService: PrismaService) {}

  async findApiKey(key: string) {
    return this.prismaService.apiKeys.findUnique({ where: { key } });
  }
}
