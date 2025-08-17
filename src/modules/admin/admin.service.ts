import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../accounts/repositories/account.repository';

@Injectable()
export class AdminService {
  constructor(private readonly accountRepository: AccountRepository) {}
}
