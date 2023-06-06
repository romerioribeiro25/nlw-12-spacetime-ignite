import 'dotenv/config'

import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { AppModule } from './app.module'
import { validationConfig } from './config/validation.config'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe(validationConfig))

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()
