import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { STABLE_VERSIONS } from '../common/constants/versions';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { generateChangelogMarkdown } from './change-log-markdown';

// --- 1. Swagger UI 옵션 및 헬퍼 함수 정의 ---

/**
 * 여러 Swagger 페이지에 공통적으로 적용될 UI 옵션입니다.
 */
const COMMON_SWAGGER_OPTIONS = {
  explorer: true,
  swaggerOptions: {
    defaultModelsExpandDepth: 10,
    defaultModelExpandDepth: 10,
    docExpansion: 'none',
    tagsSorter: (a: string, b: string) => {
      const extractNum = (tag: string) => {
        const match = tag.match(/^(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return extractNum(a) - extractNum(b);
    },
    operationsSorter: (a: any, b: any) => {
      const extractNumber = (summary: string) => {
        const match = summary.match(/^(\d+)\.(\d+)/);
        if (!match) return [0, 0];
        return [parseInt(match[1], 10), parseInt(match[2], 10)];
      };
      const summaryA = a.get('operation').get('summary') || '';
      const summaryB = b.get('operation').get('summary') || '';
      const [majorA, minorA] = extractNumber(summaryA);
      const [majorB, minorB] = extractNumber(summaryB);
      if (majorA === majorB) {
        return minorA - minorB;
      }
      return majorA - majorB;
    },
    showCommonExtensions: true,
    displayRequestDuration: true,
    deepLinking: true,
  },
};

/**
 * 지정된 버전에 대한 Swagger 페이지를 설정하는 내부 함수입니다.
 */
function setupVersionedSwaggerPage(
  app: INestApplication,
  baseDocument: Omit<OpenAPIObject, 'paths' | 'info'>, // ✅ 베이스 문서 타입 수정
  version: string,
) {
  const changelogMarkdown = generateChangelogMarkdown();
  const descriptionWithChangelog = `${changelogMarkdown}<br><hr><br>API documentation for version ${version}`;
  const versionConfig = new DocumentBuilder()
    .setTitle(`뽀짝 다락몰 API - v${version}`)
    .setDescription(descriptionWithChangelog)
    .setVersion(version)
    .build();

  const filteredPaths: Record<string, PathItemObject> = {};
  const versionPrefix = `/v${version}`;

  // ✅ app.getHttpAdapter().getInstance()를 통해 전체 경로를 가져옵니다.
  const allPaths = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().build(),
  ).paths;

  for (const path in allPaths) {
    if (path.startsWith(versionPrefix)) {
      filteredPaths[path] = allPaths[path];
    }
  }

  const filteredDocument: OpenAPIObject = {
    ...baseDocument, // ✅ paths와 info가 없는 베이스 문서를 사용합니다.
    info: versionConfig.info,
    paths: filteredPaths,
  };

  SwaggerModule.setup(
    `api/v${version}`,
    app,
    filteredDocument,
    COMMON_SWAGGER_OPTIONS,
  );
}

/**
 * 모든 버전의 API를 포함하는 통합 Swagger 페이지를 설정하는 내부 함수입니다.
 */
function setupGlobalSwaggerPage(
  app: INestApplication,
  globalDocument: OpenAPIObject, // ✅ 여기서는 전체 문서를 그대로 사용
) {
  const changelogMarkdown = generateChangelogMarkdown();
  const descriptionWithChangelog = `${changelogMarkdown}<br><hr><br>API documentation for all available versions.`;
  const globalConfig = new DocumentBuilder()
    .setTitle('뽀짝 다락몰 API - (All Versions)')
    .setDescription(descriptionWithChangelog)
    .build();

  const globalDocumentForUI = {
    ...globalDocument,
    info: globalConfig.info,
  };

  SwaggerModule.setup('api', app, globalDocumentForUI, COMMON_SWAGGER_OPTIONS);
}

/**
 * 애플리케이션의 모든 Swagger 관련 설정을 초기화하고 설정합니다.
 */
export function setupSwagger(app: INestApplication) {
  // ✅ --- BearerAuth를 포함한 기본 문서 설정을 여기서 한 번만 합니다. ---
  const baseDocumentBuilder = new DocumentBuilder()
    .setTitle('Placeholder') // 제목 등은 나중에 덮어쓰므로 중요하지 않음
    .setDescription('Placeholder')
    .addBearerAuth(); // ❗️가장 중요한 부분

  const globalDocument = SwaggerModule.createDocument(
    app,
    baseDocumentBuilder.build(),
  );

  // ✅ info와 paths를 제외한 나머지(보안 설정, 스키마 등)를 베이스로 사용합니다.
  const { paths, info, ...baseDocument } = globalDocument;

  const apiVersions = [...STABLE_VERSIONS];
  for (const version of apiVersions) {
    // ✅ 베이스 문서를 전달합니다.
    setupVersionedSwaggerPage(app, baseDocument, version);
  }

  // ✅ 통합 페이지는 기존처럼 전체 문서를 전달합니다.
  setupGlobalSwaggerPage(app, globalDocument);
}
