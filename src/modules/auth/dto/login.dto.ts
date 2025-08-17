import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '계정' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '관리자 로그인 여부' })
  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}
