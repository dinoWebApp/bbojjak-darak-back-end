import { applyDecorators, Type } from '@nestjs/common';
import { ApiCommonResponse } from '../models/api-common-response';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface SwaggerCustomResponseOptions {
  status?: number;
  isArray?: boolean;
}

export function SwaggerCustomResponse<T extends Type<any>>(
  dataDto: T,
  options?: SwaggerCustomResponseOptions,
): MethodDecorator;

export function SwaggerCustomResponse(
  options?: SwaggerCustomResponseOptions,
): MethodDecorator;

export function SwaggerCustomResponse<T extends Type<any>>(
  arg1?: T | SwaggerCustomResponseOptions,
  arg2?: SwaggerCustomResponseOptions,
): MethodDecorator {
  const [dataDto, options] =
    typeof arg1 === 'function' ? [arg1, arg2] : [undefined, arg2];

  const { status = 200, isArray = false } = options || {};

  const extraModels = dataDto
    ? [ApiCommonResponse, dataDto]
    : [ApiCommonResponse];

  return applyDecorators(
    ApiExtraModels(...extraModels),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiCommonResponse) },
          {
            properties: {
              data: dataDto
                ? isArray
                  ? { type: 'array', items: { $ref: getSchemaPath(dataDto) } }
                  : { $ref: getSchemaPath(dataDto) }
                : { type: 'null', example: null },
            },
          },
        ],
      },
    }),
  );
}
