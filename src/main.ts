import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  // Bind to 0.0.0.0 to listen on all network interfaces
  await app.listen(port, '0.0.0.0');

  const publicIp = '15.207.197.199'; // Replace with your EC2 public IP
  console.log(`App is running at http://${publicIp}:${port}`);
}

bootstrap();
