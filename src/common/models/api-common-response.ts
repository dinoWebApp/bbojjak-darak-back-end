import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE } from '../enums/response-code.enum';

export class ApiCommonResponse<T> {
  @ApiProperty({ description: '응답 코드', enum: RESPONSE_CODE })
  code: RESPONSE_CODE;

  @ApiProperty({ description: '응답 메세지' })
  message: string;

  @ApiProperty({ description: '응담 데이터', nullable: true })
  data: T | null;

  constructor(code: RESPONSE_CODE, message: string, data: T | null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
