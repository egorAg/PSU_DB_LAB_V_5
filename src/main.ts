import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Публичное API')
    .setDescription('Лабораторная работа №5')
    .setVersion('0.9')
    .setContact(`Egor Ageev`, 'https://t.me/ageev3gor', 'ShonS1v4@icloud.com')
    .addServer(`http://194.67.118.166:3000/explorer`, 'Документация к API')
    .addServer(`http://194.67.118.166:5432`, 'База данных доступна по адресу', {
      'Имя базы данных': {
        default: 'lab_5',
        description: 'Имя базы',
        enum: ['lab_5'],
      },
      'Имя пользователя': {
        default: 'user',
        description: 'Пользователь базы данных',
        enum: ['user'],
      },
      'Пароль пользователя': {
        default: 'admin',
        description: 'Пароль для доступа к базе данных',
        enum: ['admin'],
      },
      'Порт базы': {
        default: 5432,
        description: 'Порт, на котором работает база',
        enum: [5432],
      },
      'Тип базы': {
        default: 'Postgres',
        description: 'Какая база данных используется',
        enum: ['Postgres'],
      },
      'Адрес базы': {
        description: 'База доступна по адресу',
        enum: ['http://194.67.118.166:5432'],
        default: 'http://194.67.118.166:5432',
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('explorer', app, document);

  await app.listen(3000);
}
bootstrap();
