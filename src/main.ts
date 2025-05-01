import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerServiceFile } from './logger/services/logger.service.file';
import { LoggerServiceDb } from './logger/services/logger.service.db';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<LoggerServiceFile>(LoggerServiceFile);
  //const loggerDb = app.get(LoggerServiceDb);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('SmartEduHub Utility API')
    .setDescription('API for sending notifications via email or SMS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('Running the application on port 3000');

  await app.listen(3000);
  logger.log('Application run successfully');
  console.log('Swagger is running on: http://localhost:3000/api');
}

bootstrap().catch(async (error: Error) => {
  const app = await NestFactory.create(AppModule);
  const loggerDb = app.get(LoggerServiceDb);
  await loggerDb.error('Error during application bootstrap', error.stack, {
    context: 'bootstrap',
  });
  console.log('Error during application bootstrap:', error);
  process.exit(1);
});
