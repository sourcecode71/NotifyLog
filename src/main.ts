import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerService } from './logger/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  await app.listen(3000);
  logger.log('Application run successfully');
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
