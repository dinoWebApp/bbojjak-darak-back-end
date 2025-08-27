import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerApiHeaders } from 'src/common/decorators/swagger-api-headers.decorator';
import { SwaggerCustomResponse } from 'src/common/decorators/swagger-custom-response.decorator';

@ApiTags('1. 인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({summary: '1.1 로그인'})
  @SwaggerApiHeaders()
  @SwaggerCustomResponse()
}
