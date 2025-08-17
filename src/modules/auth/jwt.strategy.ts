import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountRepository } from '../accounts/repositories/account.repository';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { AccountDto } from '../accounts/dto/response/account.dto';
import { AccountEntity } from '../accounts/entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
  ) {
    if (!configService.get<string>('JWT_SECRET')) {
      throw new InternalServerErrorException('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<AccountDto> {
    const { id } = payload;
    const account: AccountEntity | null =
      await this.accountRepository.findById(id);
    if (!account) {
      throw new BadRequestException('잘못된 토큰입니다.');
    }

    return {
      id: account.id,
      email: account.email,
      isAdmin: account.isAdmin,
      createdAt: account.createdAt,
    };
  }
}
