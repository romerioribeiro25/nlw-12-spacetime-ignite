import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UploadModule } from './upload/upload.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [UploadModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
