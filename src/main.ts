import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LAB_5_API')
    .setDescription('The lab_5_api description')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('explorer', app, document);

  await app.listen(3000);
}
bootstrap();
