import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/Transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory(errors) {
        const formatErrors = (validationErrors, parentPath = '') => {
          let formattedErrors = [];

          validationErrors.forEach((error) => {
            const isArrayItem = !isNaN(Number(error.property));
            const currentPath = isArrayItem
              ? `${parentPath}.${error.property}`
              : parentPath
              ? `${parentPath}.${error.property}`
              : error.property;

            if (error.constraints) {
              formattedErrors.push({
                field: currentPath,
                message: error.constraints[Object.keys(error.constraints)[0]],
              });
            }

            if (error.children && error.children.length > 0) {
              const childErrors = formatErrors(error.children, currentPath); // Recursive call
              formattedErrors = formattedErrors.concat(childErrors);
            }
          });

          return formattedErrors;
        };

        const result = formatErrors(errors);

        return new BadRequestException(result);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('BBT Open Source Project')
    .setDescription('The Open Source API Document')
    .setVersion('1.0')
    .addTag('BBT')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access_token', // This name here is important for matching up with @ApiBearerAuth("access_token") in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const port = process.env.PORT || 8080;
  console.log(port);
  await app.listen(port);
}
bootstrap();
