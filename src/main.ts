import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { appLogger } from './repository/RepositoryModule';
import { WebModule } from './web/WebModule';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Market Report API Documentation`)
    .setDescription(`Market Report documentation.`)
    .setVersion(`1.0`)
    .build();

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup(process.env.SWAGGER_DOC_STRING, app, swaggerDocument);

  await app.listen(process.env.PORT);

  process.env.NODE_ENV === 'local'
    ? appLogger.info(
        `The swagger documentation can be accessed at: http://localhost:${process.env.PORT}/${process.env.SWAGGER_DOC_STRING}`,
      )
    : appLogger.info(
        `The swagger documentation can be accessed at: ${process.env.CYCLIC_BASE_URL}/documentation`,
      );
}

bootstrap();
