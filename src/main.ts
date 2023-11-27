import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BBT Open Source Project')
    .setDescription('The Open Source API Document')
    .setVersion('1.0')
    .addTag('BBT')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'Bearer',
        name: 'Authorization',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 8080;
  console.log(port);
  await app.listen(port);
}
bootstrap();
