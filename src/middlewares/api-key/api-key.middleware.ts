import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction, Request, Response } from 'express';
import { ApiKeysService } from 'src/modules/api-keys/api-keys.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly apiKeysService: ApiKeysService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'] as string;
    if (!apiKey) {
      throw new UnauthorizedException('api key missing');
    }

    let isValidApiKey = await this.cacheManager.get<string>(apiKey);

    if (!isValidApiKey) {
      const apiKeyFromDB = await this.apiKeysService.findApiKey(apiKey);

      if (!apiKeyFromDB) {
        throw new UnauthorizedException('Invalid api key');
      }

      await this.cacheManager.set(apiKey, 'valid', 60 * 60 * 1000);
      isValidApiKey = 'valid';
    }

    if (isValidApiKey !== 'valid') {
      throw new UnauthorizedException('Invalid api key');
    }

    next();
  }
}
