import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://192.168.112.131:4200' });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
