import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerServiceFile } from './logger/services/logger.service.file';
import { LoggerServiceDb } from './logger/services/logger.service.db';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 1. Load .env file manually first (as backup)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

//console.log('Environment variables loaded from:', process.env.MONGO_URL);

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
  await loggerDb.error({
    message: 'Error during application bootstrap',
    level: 'error',
    timestamp: new Date(),
  });
  console.log('Error during application bootstrap:', error);
  process.exit(1);
});

export { AppModule } from './app.module';
