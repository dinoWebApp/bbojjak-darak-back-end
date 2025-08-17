import { PrismaClientType } from 'src/modules/prisma/types/prisma.type';

export interface IRepository<Entity, CreateInput, UpdateInput> {
  create(data: CreateInput, prisma?: PrismaClientType): Promise<Entity>;
  findById(id: number, prisma?: PrismaClientType): Promise<Entity | null>;
  update(
    id: number,
    data: UpdateInput,
    prisma?: PrismaClientType,
  ): Promise<Entity>;
  delete(id: number, prisma?: PrismaClientType): Promise<void>;
  findAll(prisma?: PrismaClientType): Promise<Entity[]>;
}
