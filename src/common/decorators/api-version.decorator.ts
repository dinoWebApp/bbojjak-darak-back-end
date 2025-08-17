import { applyDecorators, Version } from '@nestjs/common';
import {
  LATEST_VERSION,
  LEGACY_VERSION,
  STABLE_VERSIONS,
} from '../constants/versions';
import { ApiExtension } from '@nestjs/swagger';

const VERSION_GROUPS = {
  stable: STABLE_VERSIONS,
  latest: LATEST_VERSION,
  legacy: LEGACY_VERSION,
};

export const ApiVersion = (group: keyof typeof VERSION_GROUPS) => {
  const versions = VERSION_GROUPS[group];
  return applyDecorators(
    Version(versions),
    ApiExtension('x-api-version', versions),
  );
};
