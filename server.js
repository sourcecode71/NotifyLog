// server.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module').default;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
