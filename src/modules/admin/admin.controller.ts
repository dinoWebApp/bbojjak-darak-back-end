import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiVersion } from 'src/common/decorators/api-version.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerApiHeaders } from 'src/common/decorators/swagger-api-headers.decorator';

@ApiTags('1. 관리자 관련 API')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
