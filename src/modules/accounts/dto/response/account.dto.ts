import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '관리자 여부' })
  isAdmin: boolean;

  @ApiProperty({ description: '생성 일자', type: Date })
  createdAt: Date;
}
