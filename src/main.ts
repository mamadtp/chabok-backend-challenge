import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder().setTitle('📈 Chabok Backend Challenge 📄').setDescription('The API description').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix('api');

  const logger = new Logger('📄 Bootstrap');

  const PORT = +process.env.PORT || 3000;

  const HOST = process.env.HOST || '127.0.0.1';

  await app.listen(PORT, HOST);
  logger.log(`🚀 Chabok Backend API started on ${HOST}:${PORT}`);
}
bootstrap();
