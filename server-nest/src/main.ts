import 'dotenv/config'

import { NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
      whitelist: true,
      validationError: { target: false, value: false },
    }),
  )
  await app.listen(3000)
}
bootstrap()
