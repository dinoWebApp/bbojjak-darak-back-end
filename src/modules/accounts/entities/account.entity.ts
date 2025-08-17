import { Account } from '@prisma/client';

export class AccountEntity implements Account {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
