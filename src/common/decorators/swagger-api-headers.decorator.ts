import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const SwaggerApiHeaders = () => {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      description: 'api-key',
      required: true,
    }),
  );
};
